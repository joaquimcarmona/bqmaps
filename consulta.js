let odProjectId = '';
let datasetId = 'od';
let tableNameOdEstac = 'estg'; 
     
let scopes = 'https://www.googleapis.com/auth/bigquery';

exports.query = async function (query, res) {
    const {BigQuery} = require('@google-cloud/bigquery');
    query = query.substring(1, query.length-1);
    const BQoptions = {
        scopes: scopes,
        keyFilename: '',
        projectId: odProjectId,
        query: query,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
      };
    const bigquery = new BigQuery(BQoptions);
          
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(BQoptions);
    console.log(`Job ${job.id} started.`);
          
    // Wait for the query to finish
    const [resultados] = await job.getQueryResults();
    console.log(JSON.stringify(resultados));
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end (JSON.stringify(resultados));
    return res;
}

function odeSQL(est, anos, meses, horas, d, orde) {
    var compl = 'destino';
    if(orde == 'destino') { compl = 'origem' }
    let where =  "(ano=" + anos[0];
    for (let i = 1; i < anos.length; i++) {
        where += ' or ano=' + anos[i];
    }
    where += ") and (mes=" + meses[0];
    for (let i = 1; i < meses.length; i++) {
        where += ' or mes=' + meses[i];
    }
    where += ") and (" + orde + "=" + est[0];
    for (let i = 1; i < est.length; i++) {
        where += ' or ' + orde + '=' + est[i];
    }
    where += ") and (hora=" + horas[0];
    for (let i = 1; i < horas.length; i++) {
        where += ' or hora=' + horas[i];
    }
    where += "))";
    let queryString = 'SELECT ' + compl + ', lat, long, sum(numero) as netapas FROM '
    queryString +=  '   (SELECT num, lat, long '
    queryString +=  '   FROM ' + odProjectId + '.' + datasetId + '.' + tableNameOdEstac + ') '
    queryString +=  '   INNER JOIN '
    queryString +=  '   (SELECT origem, destino, numero '
    queryString +=  '   FROM ' + odProjectId + '.' + datasetId + '.' + d
    queryString +=  '   WHERE ' + where
    queryString +=  '   ON num=' + compl 
    queryString +=  ' GROUP BY ' + compl + ', lat, long '
    queryString +=  'ORDER BY netapas DESC ';
    console.log(queryString);
    return queryString;
}

function odvSQL(est, anos, meses, horas, d, orde){
    let tableNameOdEstac = 'est198'; 
    var compl = 'destino';
    if(orde == 'destino') { compl = 'origem' }
    let where =  "(ano=" + anos[0];
    for (let i = 1; i < anos.length; i++) {
        where += ' or ano=' + anos[i];
    }
    where += ") and (mes=" + meses[0];
    for (let i = 1; i < meses.length; i++) {
        where += ' or mes=' + meses[i];
    }
    if (orde == "origem") {
        where += ") and (" + orde + "=" + est[0];
        for (let i = 1; i < est.length; i++) {
            where += ' or ' + orde + '=' + est[i];
        }
    } else {
        where += ") and (" + orde + " in ";
        where += "(SELECT num FROM " + odProjectId + '.' + datasetId + '.' + tableNameOdEstac;
        where += " WHERE numaux = " + est[0] + ")";
        for (let i = 1; i < est.length; i++) {
            where += ' or ' +  orde + " in ";
            where += "(SELECT num FROM " + odProjectId + '.' + datasetId + '.' + tableNameOdEstac;
            where += " WHERE numaux = " + est[i] + ")";
        }
    }
    for (let i = 1; i < est.length; i++) {
        where += ' or ' + orde + '=' + est[i];
    }
    where += ") and (hora=" + horas[0];
    for (let i = 1; i < horas.length; i++) {
        where += ' or hora=' + horas[i];
    }
    where += "))";
    let queryString = 'SELECT numaux, lat, long, sum(numero) as nviagens FROM '
    queryString +=  '   (SELECT num, lat, long, numaux '
    queryString +=  '   FROM ' + odProjectId + '.' + datasetId + '.' + tableNameOdEstac + ') '
    queryString +=  '   INNER JOIN '
    queryString +=  '   (SELECT origem, destino, numero '
    queryString +=  '   FROM ' + odProjectId + '.' + datasetId + '.' + d
    queryString +=  '   WHERE ' + where
    queryString +=  '   ON num=' + compl 
    queryString +=  ' GROUP BY numaux, lat, long '
    queryString +=  'ORDER BY nviagens DESC ';
    console.log(queryString);
    return queryString;
}  

function valSQL(anos, meses, horas, tipo, dmes, fer, nfer){
    let tableNameOdEstac = 'est198'; 
    let tableNameVals = 'vals';
    let where =  "(ano=" + anos[0];
    for (let i = 1; i < anos.length; i++) {
        where += ' or ano=' + anos[i];
    }
    where += ") and (mes=" + meses[0];
    for (let i = 1; i < meses.length; i++) {
        where += ' or mes=' + meses[i];
    }
    where += ") and (hora=" + horas[0];
    for (let i = 1; i < horas.length; i++) {
        where += ' or hora=' + horas[i];
    }
    if (tipo.length > 0){
        where += ") and (diasemana=" + tipo[0];
        for (let i = 1; i < tipo.length; i++) {
            where += ' or diasemana=' + tipo[i];
        }
    }
    if (fer-nfer != 0){
        console.log(fer);
        where += ") and (feriado=" + fer;
    } 
    if (dmes.length > 0){
        where += ") and (dia=" + dmes[0];
        for (let i = 1; i < dmes.length; i++) {
            where += ' or dia=' + dmes[i];
        }
    }
    where += "))";
    let queryString = 'SELECT num, lat, long, sum(nvals) as numvals FROM '
    queryString +=  '   (SELECT num, lat, long '
    queryString +=  '   FROM ' + odProjectId + '.' + datasetId + '.' + tableNameOdEstac + ') '
    queryString +=  '   INNER JOIN '
    queryString +=  '   (SELECT numest, nvals '
    queryString +=  '   FROM ' + odProjectId + '.' + datasetId + '.' + tableNameVals + ' '
    queryString +=  '   WHERE ' + where
    queryString +=  '   ON num=numest '  
    queryString +=  ' GROUP BY num, lat, long '
    queryString +=  'ORDER BY numvals DESC ';
    console.log(queryString);
    return queryString;
}  

function cartSQL(anos, meses, tipo, dmes){
    let tableNameOdEstac = 'est198';
    let tableNameVals = 'cartus';
    let where =  "(extract(year from DATE_FROM_UNIX_DATE(dia-25569))=" + anos[0];
    for (let i = 1; i < anos.length; i++) {
        where += ' or extract(year from DATE_FROM_UNIX_DATE(dia-25569))=' + anos[i];
    }
    where += ") and (extract(month from DATE_FROM_UNIX_DATE(dia-25569))=" + meses[0];
    for (let i = 1; i < meses.length; i++) {
        where += ' or extract(month from DATE_FROM_UNIX_DATE(dia-25569))=' + meses[i];
    }
    /* where += ") and (hora=" + horas[0];
    for (let i = 1; i < horas.length; i++) {
        where += ' or hora=' + horas[i];
    } */
    if (tipo.length > 0){
        where += ") and (extract(dayofweek from DATE_FROM_UNIX_DATE(dia-25569))=" + tipo[0];
        for (let i = 1; i < tipo.length; i++) {
            where += ' or extract(dayofweek from DATE_FROM_UNIX_DATE(dia-25569))=' + tipo[i];
        }
    }
    if (dmes.length > 0){
        where += ") and (extract(day from DATE_FROM_UNIX_DATE(dia-25569))=" + dmes[0];
        for (let i = 1; i < dmes.length; i++) {
            where += ' or extract(day from DATE_FROM_UNIX_DATE(dia-25569))=' + dmes[i];
        }
    }
    where += "))";
    let queryString = 'SELECT est, lat, long, sum(ncart) as nc FROM '
    queryString +=  '   (SELECT num, lat, long '
    queryString +=  '   FROM ' + odProjectId + '.' + datasetId + '.' + tableNameOdEstac + ') '
    queryString +=  '   INNER JOIN '
    queryString +=  '   (SELECT est, ncart '
    queryString +=  '   FROM ' + odProjectId + '.' + datasetId + '.' + tableNameVals + ' '
    queryString +=  '   WHERE ' + where
    queryString +=  '   ON num=est-1 '  
    queryString +=  'GROUP BY est, lat, long '
    queryString +=  'ORDER BY nc DESC ';
    console.log(queryString);
    return queryString;
}

function pompSQL(anos, meses, horas, tableName, v){
    let where =  "(ano=" + anos[0];
    for (let i = 1; i < anos.length; i++) {
        where += ' or ano=' + anos[i];
    }
    where += ") and (mes=" + meses[0];
    for (let i = 1; i < meses.length; i++) {
        where += ' or mes=' + meses[i];
    }
    where += ") and (hora=" + horas[0];
    for (let i = 1; i < horas.length; i++) {
        where += ' or hora=' + horas[i];
    }
    where += ")";
    let queryString = 'SELECT stretchNumber, latA, longA, latB, longB, pAB, pBA, pAB+pBA as p, '
    queryString +=  '     eAB, eBA, tAB, tBA, 216*eAB+248*tAB as lAB, 216*eBA+248*tBA as lBA, '
    queryString +=  '     100*pAB/(216*eAB+248*tAB) as oAB, 100*pBA/(216*eBA+248*tBA) as oBA, '
    queryString +=  '     GREATEST(100*pAB/(216*eAB+248*tAB), 100*pBA/(216*eBA+248*tBA)) as maxto FROM '
    queryString +=  '   (SELECT stretchNumber as s, sum(paxAB) as pAB, sum(paxBA) as pBA, '
    queryString +=  '   sum(etAB) as eAB, sum(etBA) as eBA, sum(ttAB) as tAB, sum(ttBA) as tBA '
    queryString +=  '   FROM ' + odProjectId + '.pomp.' + tableName + ' '
    queryString +=  '   WHERE ' + where
    queryString +=  '   GROUP BY stretchNumber)' 
    queryString +=  '   INNER JOIN '
    queryString +=  '   (SELECT stretchNumber, latA, longA, latB, longB '
    queryString +=  '   FROM ' + odProjectId + '.' + 'pomp.strh)'
    queryString +=  '   ON s=stretchNumber '
    queryString +=  'ORDER BY '+ v;
    return queryString;
}

function tmsSQL(anos, meses, horas, tipo, dmes, veic, lin, fer, nfer, et, tt,tableName){
    let datasetId = 'tms';
    let where =  "(ano=" + anos[0];
    for (let i = 1; i < anos.length; i++) {
        where += ' or ano=' + anos[i];
    }
    where += ") and (mes=" + meses[0];
    for (let i = 1; i < meses.length; i++) {
        where += ' or mes=' + meses[i];
    }
    where += ") and (hora=" + horas[0];
    for (let i = 1; i < horas.length; i++) {
        where += ' or hora=' + horas[i];
    }
    if (tipo.length > 0){
        where += ") and (DiaSem=" + tipo[0];
        for (let i = 1; i < tipo.length; i++) {
            where += ' or DiaSem=' + tipo[i];
        }
    }
    if (fer - nfer != 0){
        console.log(fer);
        where += ") and (Feriado=" + fer;
    } 
    if (dmes.length > 0){
        where += ") and (Dia=" + dmes[0];
        for (let i = 1; i < dmes.length; i++) {
            where += ' or Dia=' + dmes[i];
        }
    }
    if (veic[0].toString() != ""){
        where += ") and (V1='" + veic[0].toString() + "' or V2='" + veic[0].toString();
        for (let i = 1; i < veic.length; i++) {
            where += "' or V1='" + veic[i].toString() + "' or V2='" + veic[i].toString();
        }
        where += "'";
    } else {
        if (et - tt != 0){
            where += ") and (TT=" + tt;
        }
    }
    if (lin[0] != ""){
        where += ") and (Linha='" + lin[0];
        for (let i = 1; i < lin.length; i++) {
            where += "' or Linha='" + lin[i];
        }
        where += "'";
    } else { where += ") and (linha <>'Z'" }
    where += ")";
    where += " and dist > 0 "
    let queryString = 'SELECT station, seguinte, count(tempo) as passagens '
    queryString +=  'FROM ' + odProjectId + '.' + datasetId + '.' + tableName + ' '
    queryString +=  'WHERE ' + where
    queryString +=  'GROUP BY station, seguinte ' 
    queryString +=  'ORDER BY passagens DESC'
    return queryString;
}  
  
exports.query_in_node = async function (params, res) {
    const {serv, ...rest} = JSON.parse(params);
    console.log(serv, rest);
    switch (serv) {
        case "ode":
            const {est, anos, meses, horas, d, orde} = rest;
            query = odeSQL(est, anos, meses, horas, d, orde);
            break;
        case "odv":
            const {estv, anosv, mesesv, horasv, dv, ordev} = rest;
            query = odvSQL(estv, anosv, mesesv, horasv, dv, ordev);
            break;
        case "val":
            const {anosl, mesesl, horasl, tipo, dmes, fer, nfer } = rest;
            query = valSQL(anosl, mesesl, horasl, tipo, dmes, fer, nfer);
            break;
        case "cart":
            const {anost, mesest, tipot, dmest } = rest;
            query = cartSQL(anost, mesest, tipot, dmest);
            break;
        case "pomp":
            const {anosp, mesesp, horasp, tableName, v } = rest;
            query = pompSQL(anosp, mesesp, horasp, tableName, v);
            break;
        case "tms":
            const {anosm, mesesm, horasm, tipom, dmesm, veic, lin, ferm, nferm, et, tt,tableNamem} = rest;
            query = tmsSQL(
                anosm, mesesm, horasm, tipom, dmesm, veic, lin, ferm, nferm, et, tt,tableNamem
            );
            break;
        default:
            console.log("Serviço inexistente.");
            query = "SELECT * FROM " + odProjectId + '.' + datasetId + '.' + tableNameOdEstac;
      }
    
    const {BigQuery} = require('@google-cloud/bigquery');
    query = query;
    const BQoptions = {
        scopes: scopes,
        keyFilename: '',
        projectId: odProjectId,
        query: query,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
      };
    const bigquery = new BigQuery(BQoptions);
          
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(BQoptions);
    console.log(`Job ${job.id} started.`);
          
    // Wait for the query to finish
    const [resultados] = await job.getQueryResults();
    console.log(JSON.stringify(resultados));
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end (JSON.stringify(resultados));
    return res;
}
