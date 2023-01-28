function odvSP() {
    serv = 'odv';
    limpaMapa(); // apaga visualização de consulta  de outro serviço
    
    painel = odvPainel(); // constrói painel de input
    document.getElementById('stats').innerHTML = painel;
    
    ecraServ(); // mostra vista de introdução de inputs
    criaEscuta(); // cria escuta de clicks em inputs para apagar mapa
    
    // inicializa variáveis gerais do serviço ode
    cp = [ 'CPCamp', 'CPCont','CPRioT','CPCabe','CPErme','CPAgSa','CPSuza','CPValo','CPVala','CPFran','CPMada',
            'CPEspi','CPMira','CPGran','CPAgud','CPCoim','CPDeve','CPGenT','CPSBen','CPTrav','CPSRom','CPTrof',
            'CPSFru','CPPort','CPLean'];
    zonas = ['GDM1','GDM2','GDM3','MAI1','MAI2','MAI3','MAI4','MAI5','MTS1','MTS2','MTS3','PRT1','PRT2','PRT3',
            'PV_VC','TRF1','TRF2','TRF3','VCD3','VCD8','VLG1','VLG2','VLG3','VNG1','VNG2','VNG3','VNG4','VNG5','VNG8'];
    zonasLat = [41.169140, 41.164229, 41.135372, 41.212666, 41.268497, 41.243634, 41.207084, 41.281750,
                      41.191969, 41.224141, 41.252249, 41.153451, 41.171661, 41.162514, 41.366196,
                      41.340319, 41.310166, 41.299735, 41.332568, 41.266942, 41.191598, 41.235109, 41.215422,
                      41.126832, 41.113345, 41.080954, 41.092007, 41.128088, 41.046867];
    zonasLong = [-8.549614, -8.507642, -8.560271, -8.633962, -8.635645, -8.602592, -8.567228, -8.563511,
                       -8.672466, -8.696062, -8.717789, -8.624326, -8.664672, -8.574640, -8.757026,
                       -8.560363, -8.610276, -8.534221, -8.726210, -8.697944, -8.498477, -8.532075, -8.464111,
                       -8.611198, -8.581308, -8.601709, -8.655783, -8.655699, -8.635403];
    [lar, azu, verm, viol, verd, tc, vevi, amar] = [0,0,0,0,0,0,0,0];
    nodvsp =+ 1;
}

  async function odvSaveCsv(){
    ponto = resultados[0];
    campo = Object.keys(ponto);
    let nloc = resultados.length;
    var csv = "Anos;Meses;Horas;Dias;O/D Viagens;Estações \n";
    csv = csv + filtro + "\n \n";
    csv = csv + "N.º;Código;Viagens \n";
    for (let i=0; i<nloc; i++){
        let j = resultados[i][campo[0]];
        csv = csv + j + ";";
        if (j < 173) {
            csv = csv + e[j] + ";";
        } else {
            if (j < 198) {
                csv = csv + cp[j-173] + ";";
            } else {
                csv = csv + zonas[j-198] + ";";
            }
        }
        csv = csv + parseInt(resultados[i][campo[3]]) + "\n";
    }
    address = window.location.href;
    console.log(address);
    if (address.includes("/?")) {
        address = address + "&";
    } else {
        address = address + "?";
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
  
  function odvValid(lim){
    let txt = document.getElementById(lim).value;
    let vmin = 0;
    var vmax = 999999;
    if(document.getElementById("rank").checked){
        if(document.getElementById("or").checked){
            vmax = 134;
        } else {
            vmax = 82;
        }
    }
    let b = ((parseInt(txt)>vmin) && (parseInt(txt)<vmax));
    if(!b){
        if (lingua == 'pt') {
            alert(txt + " inaceitável");
        } else {
            alert(txt + " unacceptable");
        }
        document.getElementById(lim).blur();
        return 0;
    }
    return parseInt(txt);
}
  
function odvAlertaDados() {
    if (lingua == 'pt') {
        alert ('Não há dados para o período especificado! Só de Jan 2018 a Fev 2021, inc. (excepto Abr 2020)');
    } else {
        alert ('No data for the specified period! Only for Jan 2018 to Feb 2021, inc. (Apr 2020 excluded)')
    }
}

async function odvFetchAsync (url, lista) {
    let response = await fetch (url, {
        mode: 'no-cors',
        credentials: 'same-origin',
    });
    if (response.ok) {
        resultados = await response.json();
        if (resultados != null) {
            // se todas as origens/destinos fixados maiores que 82
            if (!haEstMP(lista)){
                // tirar destinos > 82 dos resultados
                resultados = limparResultados(resultados);
            }
        }
        if (resultados != null && resultados.length > 0) {
            console.log (resultados);
            odvSaveCsv();
            doodv(resultados, lista);
        } else {
            odvAlertaDados();
        }
        return resultados;
    } else {
        console.log(response.headers);
        console.log('HTTP ERROR: ' + response.status);
    }
}

function odvQuery(){
    limpaLegenda();
    var orde = "origem";
    if(document.getElementById("de").checked){
        orde = "destino";
    }
    var d = 'odvu';
    var txtd = "Úteis";
    if(document.getElementById("todos").checked){
        d = 'odvt';
        txtd = "Todos";
    }
    var est = document.getElementById("Est").value.split(" ");
    est = limpaloc(est);
    if(est.length < 1 && lar+azu+verm+viol+verd+tc+vevi+amar == 0 ) {
      est.push("0");
      document.getElementById("Est").value = "0";
    };
    lest = [];
    x = "";
    var j = 0;
    for (let i = 0; i < est.length; i++) {
      if (est[i] < 83) {
          x = e[parseInt(est[i])];
      } else {
          if (est[i] < 198) {
              x = cp[parseInt(est[i])-173];
          } else {
              x = zonas[parseInt(est[i])-198];
          }
      }
      j++;
      if (j == 12){
          x = "<br>" + x;
          j=0;
      }
      if (x != "") { lest.push(x); }
    }
    var anos = document.getElementById("Anos").value.split(" ");
    anos = limpa(anos, 2018, 9999);
    if(anos.length < 1) {
      anos.push("2018");
      document.getElementById("Anos").value = "2018";
    };
    var meses = document.getElementById("Meses").value.split(" ");
    meses = limpa(meses, 1, 12);
    if(meses.length < 1) {
      meses.push("5")
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
    mensagem = "Coloridas estações em função do número de viagens<br>";
    lest = completaLest(lest);
    mensagem += "Com " + orde + " em: " + lest; 
    mensagem += "<br>Nos dias:      "  + txtd; 
    mensagem += "<br>Do(s) ano(s):      "  + anos; 
    mensagem += "<br>No(s) mes(es) de:     " + lmeses;
    mensagem += "<br>Na(s) hora(s):     " + horas;
    filtro = anos + ";" + lmeses + ";" + horas + ";" + txtd + ";Com " + orde + ";" + lest
    const params = {
      "serv": "odv",
      "estv": completEst(est),
      "anosv": anos,
      "mesesv": meses,
      "horasv": horas,
      "dv": d,
      "ordev": orde
    };
    address = window.location.href;
    if (address.includes("/?")) {
        address = address + "&";
    } else {
        address = address + "?";
    }
    odvFetchAsync (
      address + "params="  + JSON.stringify(params), est
    );
}

function doodv(rows, lista){
    if (rows.length < 1) {
        odvAlertaDados();
        return;
    }
    var l1, l2, l3, l4;
    l1 = odvValid("l1");
    l2 = odvValid("l2");
    l3 = odvValid("l3");
    l4 = odvValid("l4");
    if(document.getElementById("rank").checked){
        [l1, l2, l3, l4] = reordena(l1, l2, l3, l4);
        doodvRank(rows, lista, l1, l2, l3, l4);
    } else {
        [l1, l2, l3, l4] = reordena(l1, l2, l3, l4);
        doodvInterv(rows, lista, l1, l2, l3, l4);
    }
}

function doodvRank(rows, lista, l1, l2, l3, l4){
    var cor = '#008000';
    ponto = resultados[0];
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
        for (let j = 0; j < lista.length; j++) {
            if (rows[i][campo[0]] == lista[j]) { 
                espessura = 1;
                break; }
        }
        if (parseInt(rows[i][campo[0]]) < 83 || 
            (parseInt(rows[i][campo[0]]) > 172 && parseInt(rows[i][campo[0]]) <198)) {
            shapes.push(desenhaCirc(rows[i], cor));
        } else {
            let ref = parseInt(rows[i][campo[0]]) - 198;
            shapes.push(desenhaQuad(zonasLat[ref], zonasLong[ref], cor));
        }
    }
    desde = " De " + rows[l1-1][campo[3]] + " a ";
    ate = rows[0][campo[3]] + " viagens";
    document.getElementById("verdescuro").innerHTML = desde + ate + " (ranking 1 a " + l1 + ")";
    desde = " De " + rows[l2-1][campo[3]] + " a ";
    ate = rows[l1][campo[3]] + " viagens";
    document.getElementById("verdeclaro").innerHTML = desde + ate + " (ranking " + l1 + " a " + l2 + ")";
    desde = " De " + rows[l3-1][campo[3]] + " a ";
    ate = rows[l2][campo[3]] + " viagens";
    document.getElementById("amarelo").innerHTML = desde + ate + " (ranking " + l2 + " a " + l3 + ")";
    desde = " De " + rows[l4-1][campo[3]] + " a ";
    ate = rows[l3][campo[3]] + " viagens";
    document.getElementById("laranja").innerHTML = desde + ate + " (ranking " + l3 + " a " + l4 + ")";
    desde = " De " + rows[82][campo[3]] + " a ";
    ate = rows[l4][campo[3]] + " viagens";
    document.getElementById("vermelho").innerHTML = desde + ate + " (ranking " + l4 + " a " 
            + rows.length + ")";
}

function doodvInterv(rows, lista, l1, l2, l3, l4){
    var netap;
    var cor = '#008000';
    for (let i = 0; i < rows.length; i++) {
        netap = rows[i][campo[3]];
        if (netap<l1){
            cor = '#00FF00';
        }
        if (netap<l2){
            cor = '#FFDF00';
        }
        if (netap<l3){
            cor = '#FF8C00';
        }
        if (netap<l4){
            cor = '#FF0000';
        }
        espessura = 4;
        for (let j = 0; j < lista.length; j++) {
            if (rows[i][campo[0]] == lista[j]) { 
                espessura = 1;
                break; 
            }
        }
        if (rows[i][campo[0]] < 198) {
            shapes.push(desenhaCirc(rows[i], cor));
        } else {
            let ref = rows[i][campo[0]] - 198;
            shapes.push(desenhaQuad(zonasLat[ref], zonasLong[ref], cor));
        }
    }
    desde = " De 9999999 a ";
    ate = l1 + " viagens";
    document.getElementById("verdescuro").innerHTML = desde + ate;
    desde = " De " + l1 + " a ";
    ate = l2 + " viagens";
    document.getElementById("verdeclaro").innerHTML = desde + ate;
    desde = " De " + l2 + " a ";
    ate = l3 + " viagens";
    document.getElementById("amarelo").innerHTML = desde + ate;
    desde = " De " + l3 + " a ";
    ate = l4 + " viagens";
    document.getElementById("laranja").innerHTML = desde + ate;
    desde = " De " + l4 + " a ";
    ate = "0 viagens";
    document.getElementById("vermelho").innerHTML = desde + ate;
}