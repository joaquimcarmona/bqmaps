function odeSP() {
    serv = 'ode';
    limpaMapa(); // apaga visualização de consulta de outro serviço
    
    painel = odePainel(); // constrói painel de input
    document.getElementById('stats').innerHTML = painel;
    
    ecraServ(); // mostra vista de introdução de inputs
    criaEscuta(); // cria escuta de clicks em inputs para apagar mapa
    
    // inicializa variáveis gerais do serviço ode
    [lar, azu, verm, viol, verd, tc, vevi, amar] = [0,0,0,0,0,0,0,0];
    nodesp =+ 1; // actualiza contador do número de entradas no serviço
}

async function odeSaveCsv(){
    ponto = resultados[0];
    campo = Object.keys(ponto);
    var csv = "Anos;Meses;Horas;Dias;O/D Etapas;Estações \n";
    csv = csv + filtro + "\n \n";
    csv = csv + "N.º;Código;Etapas \n";
    for (let i=0; i<83; i++){
        csv = csv + resultados[i][campo[0]] + ";";
        csv = csv + e[resultados[i][campo[0]]] + ";";
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

function odeAlertaDados() {
    if (lingua == 'pt') {
        alert ('Não há dados para o período especificado! Só de Jan 2016 a Fev 2021, inc. (excepto Abr 2020)');
    } else {
        alert ('No data for the specified period! Only for Jan 2016 to Feb 2021, inc. (Apr 2020 excluded)')
    }
}

async function odeFetchAsync (url, lista) {
    let response = await fetch (url, {
        mode: 'no-cors',
        credentials: 'same-origin',
    });
    if (response.ok) {
        resultados = await response.json();
        if (resultados.length < 1) {
            odeAlertaDados();
            return resultados;
        } else {        
            console.log (resultados);
            odeSaveCsv();
            doode(resultados, lista);
            return resultados;
        }
    } else {
        console.log(response.headers);
        console.log('HTTP ERROR: ' + response.status);
    }
}

function odeQuery(){
    limpaLegenda();
    if(document.getElementById("de").checked){
        orde = "destino";
    }
    var d = 'odeu';
    var txtd = "Úteis";
    if(document.getElementById("todos").checked){
        d = 'odet';
        txtd = "Todos";
    }
    var est = document.getElementById("Est").value.split(" ");
    est = limpa(est, 0, 82);
    if(est.length < 1 && lar+azu+verm+viol+verd+tc+vevi+amar == 0 ) {
        est.push("0")
        document.getElementById("Est").value = "0";
    };
    lest = [];
    var j = 0;
    for (let i = 0; i < est.length; i++) {
      x = e[parseInt(est[i])];
      j++;
      if (j == 12){
          x = "<br>" + x;
          j=0;
      }
      lest.push(x);
    }
    var anos = document.getElementById("Anos").value.split(" ");
    anos = limpa(anos, 2019, 9999);
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
    mensagem = "Coloridas estações em função do número de etapas<br>";
    lest = completaLest(lest);
    mensagem += "Com " + orde + " em: " + lest; 
    mensagem += "<br>Nos dias:      "  + txtd; 
    mensagem += "<br>Do(s) ano(s):      "  + anos; 
    mensagem += "<br>No(s) mes(es) de:     " + lmeses;
    mensagem += "<br>Na(s) hora(s):     " + horas;
    filtro = anos + ";" + lmeses + ";" + horas + ";" + txtd + ";Com " + orde + ";" + lest
    const params = {
      "serv": "ode",
      "est": completEst(est),
      "anos": anos,
      "meses": meses,
      "horas": horas,
      "d": d,
      "orde": orde
    };
    address = window.location.href;
    if (address.includes("/?")) {
        address = address + "&";
    } else {
        address = address + "?";
    }
    odeFetchAsync (
      address + "params="  + JSON.stringify(params), est
    );
}

function doode(rows, lista){
    if (rows.length < 1) {
        odeAlertaDados();
        return;
    }
    var l1, l2, l3, l4;
    l1 = valid("l1");
    l2 = valid("l2");
    l3 = valid("l3");
    l4 = valid("l4");
    if(document.getElementById("rank").checked){
        [l1, l2, l3,l4] = reordena(l1, l2, l3, l4);
        doodeRank(rows, lista, l1, l2, l3, l4);
    } else {
        [l1, l2, l3,l4] = reordena(l1, l2, l3, l4);
        doodeInterv(rows, lista, l1, l2, l3, l4);
    }
  }
  
  function doodeRank(rows, lista, l1, l2, l3, l4){
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
        for (let j = 0; j < lista.length; j++) {
            if (rows[i][campo[0]] == lista[j]) { 
                espessura = 1;
                break; }
        }
        shapes.push(desenhaCirc(rows[i], cor));
    }
    desde = " De " + Math.floor(rows[l1-1][campo[3]]) + " a ";
    ate = Math.floor(rows[0][campo[3]]) + " etapas";
    document.getElementById("verdescuro").innerHTML = desde + ate + " (ranking 1 a " + l1 + ")";
    desde = " De " + Math.floor(rows[l2-1][campo[3]]) + " a ";
    ate = Math.floor(rows[l1][campo[3]]) + " etapas";
    document.getElementById("verdeclaro").innerHTML = desde + ate + " (ranking " + l1 + " a " + l2 + ")";
    desde = " De " + Math.floor(rows[l3-1][campo[3]]) + " a ";
    ate = Math.floor(rows[l2][campo[3]]) + " etapas";
    document.getElementById("amarelo").innerHTML = desde + ate + " (ranking " + l2 + " a " + l3 + ")";
    desde = " De " + Math.floor(rows[l4-1][campo[3]]) + " a ";
    ate = Math.floor(rows[l3][campo[3]]) + " etapas";
    document.getElementById("laranja").innerHTML = desde + ate + " (ranking " + l3 + " a " + l4 + ")";
    desde = " De " + Math.floor(rows[82][campo[3]]) + " a ";
    ate = Math.floor(rows[l4][campo[3]]) + " etapas";
    document.getElementById("vermelho").innerHTML = desde + ate + " (ranking " + l4 + " a 83)";
  }
  
  function doodeInterv(rows, lista, l1, l2, l3, l4){
    if (rows.length < 1) {
        odeAlertaDados();
        return;
    }
    var netap;
    var cor = '#008000';
    ponto = rows[0];
    campo = Object.keys(ponto);    
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
            if (rows[i][campo[3]] == lista[j]) { 
                espessura = 1;
                break; 
            }
        }
        shapes.push(desenhaCirc(rows[i], cor));
    }
    desde = " De 9999999 a ";
    ate = l1 + " etapas";
    document.getElementById("verdescuro").innerHTML = desde + ate;
    desde = " De " + l1 + " a ";
    ate = l2 + " etapas";
    document.getElementById("verdeclaro").innerHTML = desde + ate;
    desde = " De " + l2 + " a ";
    ate = l3 + " etapas";
    document.getElementById("amarelo").innerHTML = desde + ate;
    desde = " De " + l3 + " a ";
    ate = l4 + " etapas";
    document.getElementById("laranja").innerHTML = desde + ate;
    desde = " De " + l4 + " a ";
    ate = "0 etapas";
    document.getElementById("vermelho").innerHTML = desde + ate;
  }
  
    
