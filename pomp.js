function pompSP() {
    serv = 'pomp';
    limpaMapa(); // apaga visualização de consulta de outro serviço
    
    painel = pompPainel(); // constrói painel de input
    document.getElementById('stats').innerHTML = painel;
    
    ecraServ(); // mostra vista de introdução de inputs
    criaEscuta(); // cria escuta de clicks em inputs para apagar mapa
    
    // inicializa variáveis gerais do serviço pomp
    npompsp =+ 1; // actualiza contador do número de entradas no serviço
}

async function pompSaveCsv(){
    ponto = resultados[0];
    campo = Object.keys(ponto);
    address = window.location.href;
    console.log(address);
    if (address.includes("/?")) {
        address = address + "&";
    } else {
        address = address + "?";
    }
    var lab, lba, pab, pba, p;
    nv = document.getElementById("v").selectedIndex;
    ind = fvar[nv];
    var csv = "Anos;Meses;Horas;Dias; \n";
    csv = csv + filtro + "\n \n";
    csv = csv + "Troço;A;B; \n";
    // identifica a variável pesquisada
    if (nv == 0) { csv = csv + "PAXAB\n"}
    else if (nv == 1) {csv = csv + "PaxBA\n";}
    else if (nv == 2) {csv = csv + "Pax\n";}
    else if (nv == 3) {csv = csv + "ETAB\n";}
    else if (nv == 4) {csv = csv + "ETBA\n";}
    else if (nv == 5) {csv = csv + "TTAB\n";}
    else if (nv == 6) {csv = csv + "TTBA\n";}
    else if (nv == 7) {csv = csv + "LugAB\n";}
    else if (nv == 8) {csv = csv + "LugBA\n";}
    else if (nv == 9) {csv = csv + "TOAB\n";}
    else if (nv == 10) {csv = csv + "TOBA\n";}
    else if (nv == 11) {csv = csv + "maxTO\n";}
    for (let i=0; i<82; i++){
        lab = parseInt(resultados[i][campo[8]])*216 + parseInt(resultados[i][campo[10]])*248;
        lba = parseInt(resultados[i][campo[9]])*216 + parseInt(resultados[i][campo[11]])*248;
        pab = parseInt(resultados[i][campo[5]]);
        pba = parseInt(resultados[i][campo[6]]); 
        p = pab + pba;
        csv = csv + resultados[i][campo[0]] + ";" + stationA[resultados[i][campo[0]]-1] + ";";
        csv = csv + stationB[resultados[i][campo[0]]-1] + ";";
        if (nv == 0) {csv = csv + pab + "\n";}
        else if (nv == 1) {csv = csv + pba + ";\n";}
        else if (nv == 2) {csv = csv + p + ";\n";}
        else if (nv == 3) {csv = csv + parseInt(resultados[i][campo[8]]) + ";\n";}
        else if (nv == 4) {csv = csv + parseInt(resultados[i][campo[9]]) + ";\n";}
        else if (nv == 5) {csv = csv + parseInt(resultados[i][campo[10]]) + ";\n";}
        else if (nv == 6) {csv = csv + parseInt(resultados[i][campo[11]]) + ";\n";}
        else if (nv == 7) {csv = csv + lab + ";\n";}
        else if (nv == 8) {csv = csv + lba + ";\n";}
        else if (nv == 9) {csv = csv + 100*pab/lab + ";\n";}
        else if (nv == 10) {csv = csv + 100*pba/lba + ";\n";}
        else if (nv == 11) {csv = csv + 100 * Math.max(pab/lab, pba/lba) + "\n";}
    }
    console.log(address + "fileToWrite="  + encodeURI(csv));
    let response = await fetch (address + "fileToWrite="  + encodeURIComponent(csv), {
        mode: 'no-cors',
        credentials: 'same-origin',
    })
    fileName = await response.json();
    console.log (fileName);
    if (!response.ok) {
        console.log(response.headers);
        console.log('HTTP ERROR: ' + response.status);
    }
}

function pompAlertaDados() {
    if (lingua == 'pt') {
        alert ('Não há dados para o período especificado!  Só para Jan 2016 a Fev 2021 inc para todos os dias e para Nov 2016 a Fev 2021 para dias úteis.');
    } else {
        alert ('No data for the specified period! Only for Jan 2016 to Feb 2021, inc. (for all days) and for Nov 2016 to Feb 2021, inc. (for week days)')
    }
}



async function pompFetchAsync (url) {
    let response = await fetch (url, {
        mode: 'no-cors',
        credentials: 'same-origin',
    });
    if (response.ok) {
        resultados = await response.json();
            if (resultados != null && resultados.length > 0) {
                console.log (resultados);
                pompSaveCsv();
                dopo(resultados);
            } else {
                pompAlertaDados();
                return resultados;
            }
        } else {
            console.log(response.headers);
            console.log('HTTP ERROR: ' + response.status);
        }
    }

function poQuery(){
    limpaLegenda();
    var txtd = "Úteis";
    tableName = "uteis";
    if(document.getElementById("todos").checked){
        tableName = 'todos';
        txtd = "Todos";
    }
    nv = document.getElementById("v").selectedIndex;
    shortv = shortvar[nv];
    if (document.getElementById("intervT").checked) {
        shortv = shortv.replace("AB", " para Trindade");
        shortv = shortv.replace("BA", " de Trindade");
    }
    nome = nomevar[nv] + ' DESC ';
    if(!document.getElementById("rank").checked){
        nome = "stretchNumber" + ' ASC ';
    }
    ind = fvar[nv];
    var anos = document.getElementById("Anos").value.split(" ");
    anos = limpa(anos, 2016, 9999);
    if(anos.length < 1) {
      anos.push("2019");
      document.getElementById("Anos").value = "2019";  
    };
    var meses = document.getElementById("Meses").value.split(" ");
    meses = limpa(meses, 1, 12);
    if(meses.length < 1) {
      meses.push("5");
      document.getElementById("Meses").value = "5";
    };
    lmeses = [];
    for (let i = 0; i < meses.length; i++) {
      lmeses.push(m[parseInt(meses[i])-1]);
    }
    var horas = document.getElementById("Horas").value.split(" ");
    horas = limpa(horas, 1, 24);
    if(horas.length < 1) {
      horas.push("8");
      document.getElementById("Horas").value = "8";
    };
    mensagem = "Coloridos os troços em função de " + shortv + "<br>";
    mensagem += "<br>Nos dias:      "  + txtd; 
    mensagem += "<br>Do(s) ano(s):      "  + anos; 
    mensagem += "<br>No(s) mes(es) de:     " + lmeses;
    mensagem += "<br>Na(s) hora(s):     " + horas;
    filtro = anos + ";" + lmeses + ";" + horas + ";" + txtd + ";";
    const params = {
      "serv": "pomp",
      "anosp": anos,
      "mesesp": meses,
      "horasp": horas,
      "tableName": tableName,
      "v": nome
    };
    address = window.location.href;
    if (address.includes("/?")) {
        address = address + "&";
    } else {
        address = address + "?";
    }
    pompFetchAsync (
      address + "params="  + JSON.stringify(params)
    );
}

function dopo(rows){
    if (rows.length < 1) {
        pompAlertaDados();
        return;
    }
    var l1, l2, l3, l4;
    l1 = valid("l1");
    l2 = valid("l2");
    l3 = valid("l3");
    l4 = valid("l4");
    if(document.getElementById("rank").checked){
        if(l2<l1) { l2 = 0 }
        if(l3<l2) { l3 = 0 }
        if(l4<l3) { l4 = 0 }
        dopoRank(rows, l1, l2, l3, l4);
    } else {
        if(l2>l1) { l2 = 999999 }
        if(l3>l2) { l3 = 999999 }
        if(l4>l3) { l4 = 999999 }
        dopoInterv(rows, l1, l2, l3, l4);
    }
  }
  
  function dopoRank(rows, l1, l2, l3, l4){
    if (rows.length < 1) {
        pompAlertaDados();
        return;
    }
    var cor = '#008000';
    ponto = rows[0];
    campo = Object.keys(ponto);
    for (let i = 0; i < rows.length; i++) {
        if (i==l1){
            cor = '#00FF00';
        }
        if (i==l2){
            cor = '#FFDF00';
        }
        if (i==l3){
            cor = '#FF8C00';
        }
        if (i==l4){
            cor = '#FF0000';
        }
        espessura = 4;
        shapes.push(desenhaTro(rows[i], cor));
    }
    desde = " De " + Math.round(rows[l1-1][campo[ind]]) + " a ";
    ate = Math.round(rows[0][campo[ind]]) + " " + shortv;
    document.getElementById("verdescuro").innerHTML = desde + ate + " (ranking 1 a " + l1 + ")";
    desde = " De " + Math.floor(rows[l2-1][campo[ind]]) + " a ";
    ate = Math.round(rows[l1][campo[ind]]) + " " + shortv;
    document.getElementById("verdeclaro").innerHTML = desde + ate + " (ranking " + l1 + " a " + l2 + ")";
    desde = " De " + Math.round(rows[l3-1][campo[ind]]) + " a ";
    ate = Math.round(rows[l2][campo[ind]]) + " " + shortv;
    document.getElementById("amarelo").innerHTML = desde + ate + " (ranking " + l2 + " a " + l3 + ")";
    desde = " De " + Math.floor(rows[l4-1][campo[ind]]) + " a ";
    ate = Math.round(rows[l3][campo[ind]]) + " " + shortv;
    document.getElementById("laranja").innerHTML = desde + ate + " (ranking " + l3 + " a " + l4 + ")";
    desde = " De " + Math.round(rows[81][campo[ind]]) + " a ";
    ate = Math.round(rows[l4][campo[ind]]) + " " + shortv;
    document.getElementById("vermelho").innerHTML = desde + ate + " (ranking " + l4 + " a 83)";
  }
  
  function dopoInterv(rows, l1, l2, l3, l4){
    var num;
    ponto = rows[0];
    campo = Object.keys(ponto);    
    for (let i = 0; i < rows.length; i++) {
        num = rows[i][campo[ind]];
        var cor = '#008000';
        if (document.getElementById("intervT").checked) {
            if ((i>14 && i < 63) | i>70 ) {
                num = rows[i][campo[[fvarT[nv]]]];
            }
        }
        if (num<l1){
            cor = '#00FF00';
        }
        if (num<l2){
            cor = '#FFDF00';
        }
        if (num<l3){
            cor = '#FF8C00';
        }
        if (num<l4){
            cor = '#FF0000';
        }
        shapes.push(desenhaTro(rows[i], cor));
    }
    desde = " De 9999999 a ";
    ate = l1 + " " + shortv;
    document.getElementById("verdescuro").innerHTML = desde + ate;
    desde = " De " + l1 + " a ";
    ate = l2 + " " + shortv;
    document.getElementById("verdeclaro").innerHTML = desde + ate;
    desde = " De " + l2 + " a ";
    ate = l3 + " " + shortv;
    document.getElementById("amarelo").innerHTML = desde + ate;
    desde = " De " + l3 + " a ";
    ate = l4 + " " + shortv;
    document.getElementById("laranja").innerHTML = desde + ate;
    desde = " De " + l4 + " a ";
    ate = "0 etapas";
    document.getElementById("vermelho").innerHTML = desde + ate;
}

function desenhaTro(f, cor){
    campo = Object.keys(f); 
    let coordsA = { lat: parseFloat(f[campo[1]]), lng: parseFloat(f[campo[2]]) };
    let latLngA = new google.maps.LatLng(coordsA);
    let coordsB = { lat: parseFloat(f[campo[3]]), lng: parseFloat(f[campo[4]]) };
    let latLngB = new google.maps.LatLng(coordsB);
    var line = new google.maps.Polyline({
        path: [latLngA, latLngB],
        strokeColor: cor,
        strokeOpacity: 1.0,
        strokeWeight: 10,
        map: map
    });
    return line;
}