function valSP() {
    serv = 'val';
    limpaMapa(); // apaga visualização de consulta de outro serviço
    
    painel = valPainel(); // constrói painel de input
    document.getElementById('stats').innerHTML = painel;
    
    ecraServ(); // mostra vista de introdução de inputs
    criaEscuta(); // cria escuta de clicks em inputs para apagar mapa
    
    // inicializa variáveis gerais do serviço ode
    [fer, nfer] = [0, 0];
    nvalsp =+ 1; // actualiza contador do número de entradas no serviço */
}

async function valSaveCsv(){
    ponto = resultados[0];
    campo = Object.keys(ponto);
    let nloc = resultados.length;
    var csv = "Anos;Meses;Horas;Dias; \n";
    csv = csv + filtro + "\n \n";
    csv = csv + "N.º;Código;Validações \n";
    for (let i=0; i<nloc; i++){
        let j = resultados[i][campo[0]];
        csv = csv + j + ";";
        if (j < 84) {
            csv = csv + e[j] + ";";
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

function cfer(){
    if(!fer){
      document.getElementById("fer").style.background = "black";
      document.getElementById("fer").style.color = "white";
      fer = 1;
    } else {
      document.getElementById("fer").style.background = "#F0F0F0";
      document.getElementById("fer").style.color = "black";
      fer = 0;
    }
}      

function cnfer(){
    if(!nfer){
      document.getElementById("nfer").style.background = "black";
      document.getElementById("nfer").style.color = "white";
      nfer = 1;
    } else {
      document.getElementById("nfer").style.background = "#F0F0F0";
      document.getElementById("nfer").style.color = "black";
      nfer = 0;
    }
}

function valAlertaDados() {
    if (lingua == 'pt') {
        alert ('Não há dados para o período especificado! Só de Jan 2019 a Fev 2021, inc. (excepto Abr 2020)');
    } else {
        alert ('No data for the specified period! Only for Jan 2019 to Feb 2021, inc. (Apr 2020 excluded)')
    }
}

async function valFetchAsync (url) {
    let response = await fetch (url, {
        mode: 'no-cors',
        credentials: 'same-origin',
    });
    if (response.ok) {
        resultados = await response.json();
        if (resultados.length < 1) {
            valAlertaDados();
            return resultados;
        } else {        
            console.log (resultados);
            valSaveCsv();
            doval(resultados);
            return resultados;
        }
    } else {
        console.log(response.headers);
        console.log('HTTP ERROR: ' + response.status);
    }
}

function valQuery(){
    limpaLegenda();
    var tipo = document.getElementById("Tipo").value.split(" ");
    tipo = limpa(tipo, 1, 7);
    ltipo = [];
    for (let i = 0; i < tipo.length; i++) {
        ltipo.push(dsem[parseInt(tipo[i])-1]);
    }
    var dmes = document.getElementById("DMes").value.split(" ");
    dmes = limpa(dmes, 1, 31);
    var anos = document.getElementById("Anos").value.split(" ");
    anos = limpa(anos, 2019, 9999);
    if(anos.length < 1) {
      anos.push("2020");
      document.getElementById("Anos").value = "2020";  
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
    for (var i=0; i<horas.length; i++) {
        if(horas[i] == "24") { horas[i]="0"}
    }
    horas = limpa(horas, 0, 23);
    if(horas.length < 1) {
      horas.push("8");
      document.getElementById("Horas").value = "8";
    };
    mensagem = "Coloridas estações em função do número de validações<br>";
    mensagem += "<br>Do(s) ano(s):      " + anos; 
    mensagem += "<br>No(s) mes(es):      " + lmeses; 
    mensagem += "<br>Na(s) hora(s):      " + horas; 
    filtro = anos + ";" + lmeses + ";" + horas + ";" ;   
    if (ltipo.length > 0){
        filtro += ltipo + ";";
        mensagem += "<br>Nos dias tipo:     "  + ltipo; 
    }
    if (fer-nfer != 0){
        if (fer == 0){
            filtro += " Não feriado ;";
            mensagem += " Não feriado " ;
        } else {
            filtro += " Feriado ;";
            mensagem += " Feriado " ;
        }
    }
    if (dmes.length>0){
        filtro += dmes + ";";
        mensagem += "<br>Nos dias do mês:    "  + dmes;
    }
    const params = {
      "serv": "val",
      "anosl": anos,
      "mesesl": meses,
      "horasl": horas,
      "tipo": tipo,
      "dmes": dmes,
      "fer": fer,
      "nfer": nfer
    };
    address = window.location.href;
    if (address.includes("/?")) {
        address = address + "&";
    } else {
        address = address + "?";
    }
    valFetchAsync (
      address + "params="  + JSON.stringify(params)
    );
}

function doval(rows){
    if (rows.length < 1) {
        valAlertaDados();
        return;
    }
    var l1, l2, l3, l4;
    l1 = valid("l1");
    l2 = valid("l2");
    l3 = valid("l3");
    l4 = valid("l4");
    if(document.getElementById("rank").checked){
        if(l2<l1) { l2 = l1 + 1 }
        if(l3<l2) { l3 = l2 + 1 }
        if(l4<l3) { l4 = l3 + 1 }
        dovalRank(rows, l1, l2, l3, l4);
    } else {
        if(l2>l1) { l2 = 999999 }
        if(l3>l2) { l3 = 999999 }
        if(l4>l3) { l4 = 999999 }
        dovalInterv(rows, l1, l2, l3, l4);
    }
  }
  
function dovalRank(rows, l1, l2, l3, l4){
    if (l1 > rows.length){
        l1 = rows.length;
    }
    if (l2 > rows.length){
        l2 = rows.length;
    }
    if (l3 > rows.length){
        l3 = rows.length;
    }
    if (l4 > rows.length){
        l4 = rows.length;
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
        if (parseInt(rows[i][campo[0]]) < 83 || 
            (parseInt(rows[i][campo[0]]) > 172 && parseInt(rows[i][campo[0]]) <198)) {
            shapes.push(desenhaCirc(rows[i], cor));
        } 
    }
    desde = " De " + rows[l1-1][campo[3]] + " a ";
    ate = rows[0][campo[3]] + " validações";
    document.getElementById("verdescuro").innerHTML = desde + ate + " (ranking 1 a " + l1 + ")";
    desde = " De " + rows[l2-1][campo[3]] + " a ";
    ate = rows[l1][campo[3]] + " validações";
    document.getElementById("verdeclaro").innerHTML = desde + ate + " (ranking " + l1 + " a " + l2 + ")";
    desde = " De " + rows[l3-1][campo[3]] + " a ";
    ate = rows[l2][campo[3]] + " validações";
    document.getElementById("amarelo").innerHTML = desde + ate + " (ranking " + l2 + " a " + l3 + ")";
    desde = " De " + rows[l4-1][campo[3]] + " a ";
    ate = rows[l3][campo[3]] + " validações";
    document.getElementById("laranja").innerHTML = desde + ate + " (ranking " + l3 + " a " + l4 + ")";
    if (rows.length>82){
        desde = " De " + rows[82][campo[3]] + " a ";
    } else {
        desde = " De " + rows[rows.length-1][campo[3]] + " a ";
    }
    ate = rows[l4][campo[3]] + " validações";
        document.getElementById("vermelho").innerHTML = desde + ate + " (ranking " + l4 + " a " 
                + rows.length + ")";
}

function dovalInterv(rows, l1, l2, l3, l4){
    if (rows.length < 1) {
        valAlertaDados();
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
        shapes.push(desenhaCirc(rows[i], cor));
    }
    desde = " De 9999999 a ";
    ate = l1 + " validações";
    document.getElementById("verdescuro").innerHTML = desde + ate;
    desde = " De " + l1 + " a ";
    ate = l2 + " validações";
    document.getElementById("verdeclaro").innerHTML = desde + ate;
    desde = " De " + l2 + " a ";
    ate = l3 + " validações";
    document.getElementById("amarelo").innerHTML = desde + ate;
    desde = " De " + l3 + " a ";
    ate = l4 + " validações";
    document.getElementById("laranja").innerHTML = desde + ate;
    desde = " De " + l4 + " a ";
    ate = "0 validações";
    document.getElementById("vermelho").innerHTML = desde + ate;
  }