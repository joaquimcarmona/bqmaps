function tmsSP() {
    serv = 'tms';
    limpaMapa(); // apaga visualização de consulta de outro serviço
    
    painel = tmsPainel(); // constrói painel de input
    document.getElementById('stats').innerHTML = painel;
    
    ecraServ(); // mostra vista de introdução de inputs
    criaEscuta(); // cria escuta de clicks em inputs para apagar mapa
    
    // inicializa variáveis gerais do serviço ode
    ntmssp =+ 1; // actualiza contador do número de entradas no serviço */
}

async function tmsSaveCsv(){
    ponto = resultados[0];
    campo = Object.keys(ponto);
    var csv = "Anos;Meses;Horas;Dias;Veículos;Linhas \n";
    csv = csv + filtro + "\n \n";
    csv = csv + "De;Para;Passagens \n";
    for (let i=0; i<tratados.length; i++){
        if (tratados[i][2] == 0) { break }
        if (nv == 0) {
            csv = csv + stationA[tratados[i][0]] + ";";
            csv = csv + stationB[tratados[i][0]] + ";";
        } else {
            csv = csv + stationB[tratados[i][0]] + ";";
            csv = csv + stationA[tratados[i][0]] + ";";
        }
        csv = csv + parseInt(tratados[i][2]) + "\n";
    }
    tratados = tratados.fill([0, 0, 0]);
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

function cET(){
    if(!et){
      document.getElementById("ET").style.background = "black";
      document.getElementById("ET").style.color = "white";
      et = 1;
    } else {
      document.getElementById("ET").style.background = "#F0F0F0";
      document.getElementById("ET").style.color = "black";
      et = 0;
    }
}

function cTT(){
    if(!tt){
      document.getElementById("TT").style.background = "black";
      document.getElementById("TT").style.color = "white";
      tt = 1;
    } else {
      document.getElementById("TT").style.background = "#F0F0F0";
      document.getElementById("TT").style.color = "black";
      tt = 0;
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

function tmsAlertaDados() {
    if (lingua == 'pt') {
        alert ('Não há dados para o período especificado!  Só para Jan 2016 a Fev 2021 inc para todos os dias e para Nov 2016 a Fev 2021 para dias úteis.');
    } else {
        alert ('No data for the specified period! Only for Jan 2016 to Feb 2021, inc. (for all days) and for Nov 2016 to Feb 2021, inc. (for week days)')
    }
}

async function tmsFetchAsync (url) {
    let response = await fetch (url, {
        mode: 'no-cors',
        credentials: 'same-origin',
    });
    if (response.ok) {
        resultados = await response.json();
        if (resultados != null && resultados.length > 0) {
            dotms(coords, resultados);
            tmsSaveCsv();
        } else {
            tmsAlertaDados();
            return resultados;
        }
    } else {
        console.log(response.headers);
        console.log('HTTP ERROR: ' + response.status);
    }
  }

function tmsQuery(){
    limpaLegenda();
    tableName = "resultados";
    var veic = document.getElementById("Veic").value.split(" ");
    veic = limpa(veic, 1, 140);
    if(veic.length < 1) {
        veic.push("");
        document.getElementById("Veic").value = "";
    };
    var lin = document.getElementById("Linh").value.split(" ");
    lin = limpaLinhas(lin);
    var tipo = document.getElementById("Tipo").value.split(" ");
    tipo = limpa(tipo, 1, 7);
    ltipo = [];
    for (let i = 0; i < tipo.length; i++) {
        ltipo.push(dsem[parseInt(tipo[i])-1]);
    }
    var dmes = document.getElementById("DMes").value.split(" ");
    dmes = limpa(dmes, 1, 31);
    nv = document.getElementById("v").selectedIndex;
    // let v = lvartms[nv];
    shortv = shortvartms[nv];
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
    for (var i=0; i<horas.length; i++) {
        if(horas[i] == "24") { horas[i]="0"}
    }
    horas = limpa(horas, 0, 23);
    if(horas.length < 1) {
        horas.push("8");
        document.getElementById("Horas").value = "8";
    }
    mensagem = "Coloridas estações em função de " + shortv + "<br>";
    mensagem += "<br>Do(s) ano(s):      "  + anos; 
    mensagem += "<br>No(s) mes(es) de:     " + lmeses;
    mensagem += "<br>Na(s) hora(s):     " + horas;
    filtro = anos + ";" + lmeses + ";" + horas + ";" + ltipo + ";" ;
    if (ltipo.length >0){
        filtro += ltipo + ";";
        mensagem += "<br>Nos dias tipo:     "  + ltipo; 
    }
    filtro = anos + ";" + lmeses + ";" + horas + ";" + ltipo + ";" ; 
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
    if (veic[0].toString() != ""){
        filtro +=  veic + ";" ;
        mensagem += "<br>Dos veiculos:      "  + veic; 
    } else {
        if (et - tt != 0){
            mensagem += "<br>Dos veiculos:      " ;
            if (et == 1){
                filtro += " ET ;";
                mensagem += " ET " ;
            } else {
                filtro += " TT ;";
                mensagem += " TT " ;
            }
        }
    }
    if (lin.length>0){
        filtro += lin + ";";
        mensagem += "<br>Nas linhas:    "  + lin;
    }
    const params = {
        "serv": "tms",
        "anosm": anos,
        "mesesm": meses,
        "horasm": horas,
        "tipom": tipo,
        "dmesm": dmes,
        "veic": veic,
        "lin": lin,
        "ferm": fer,
        "nferm": nfer,
        "et": et,
        "tt": tt,
        "tableNamem": tableName
    };
    address = window.location.href;
    if (address.includes("/?")) {
        address = address + "&";
    } else {
        address = address + "?";
    }
    tmsFetchAsync (
      address + "params="  + JSON.stringify(params)
    );
}

function limpaLinhas(lista){
    var nova = [];
    for (let i = 0; i < lista.length; i++) {
        if ("ABCDEFGZ".includes(lista[i])){
            nova.push(lista[i]);
        } else {
           alert(lista[i] + " não existe.");
        }
    };
    return nova;
}

function dotms(coords, rows){
    if (rows.length < 1) {
        tmsAlertaDados();
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
        dotmsRank(coords, rows, l1, l2, l3, l4);
    } else {
        if(l2>l1) { l2 = 999999 }
        if(l3>l2) { l3 = 999999 }
        if(l4>l3) { l4 = 999999 }
        dotmsInterv(coords, rows, l1, l2, l3, l4);
    }
  }
  
  function dotmsRank(coords, rows, l1, l2, l3, l4){
    if (rows.length < 1) {
        tmsAlertaDados();
        return;
    }
    var cor = '#008000';
    tratados = processaResultados(rows);
    for (let i = 0; i < tratados.length; i++) {
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
        if (tratados[i][2] > 0) {
            shapes.push(desenhaTroTms(coords, tratados[i], cor));
        }
    }
    desde = " De " + tratados[l1-1][2] + " a ";
    ate = tratados[0][2] + " " + shortv;
    document.getElementById("verdescuro").innerHTML = desde + ate + " (ranking 1 a " + l1 + ")";
    desde = " De " + tratados[l2-1][2] + " a ";
    ate = tratados[l1][2] + " " + shortv;
    document.getElementById("verdeclaro").innerHTML = desde + ate + " (ranking " + l1 + " a " + l2 + ")";
    desde = " De " + tratados[l3-1][2] + " a ";
    ate = tratados[l2][2] + " " + shortv;
    document.getElementById("amarelo").innerHTML = desde + ate + " (ranking " + l2 + " a " + l3 + ")";
    desde = " De " + tratados[l4-1][2] + " a ";
    ate = tratados[l3][2] + " " + shortv;
    document.getElementById("laranja").innerHTML = desde + ate + " (ranking " + l3 + " a " + l4 + ")";
    desde = " De " + tratados[78][2] + " a ";
    ate = tratados[l4][2] + " " + shortv;
    document.getElementById("vermelho").innerHTML = desde + ate + " (ranking " + l4 + " a 83)";
}

function processaResultados(rows) {
    var j = 0;
    // tratados = tratados.fill([0, 0, 0]);
    ponto = resultados[0];
    campo = Object.keys(ponto);
    for (let i = 0; i < rows.length; i++) {
      if (nv == 0){ // Sentido AB
        if (rows[i][campo[1]]== 'CSra da Hora') { rows[i][campo[1]] = 'BSra da Hora' }
        if (rows[i][campo[1]]== 'Sra da Hora') { rows[i][campo[1]] = 'BSra da Hora' }
        if (rows[i][campo[1]] == 'EDos Verdes') { rows[i][campo[1]] = 'Dos Verdes'}
        est = pos(rows[i][campo[0]], stationAtms);
        seg = pos(rows[i][campo[1]], stationBtms);
        if (est == 999) { 
            console.log(rows[i]);
            continue;
        }
        if (est == 23 && seg == 32) { est = 32 }
        if (est == 23 && seg == 53) { est = 53 }
        if (est == 33 && seg == 54) { est = 54 }
        if (est == 37 && seg == 79) { est = 79 }
        if (est == 82 && seg == 42) { est = 42 }
        if (seg == est) {
            tratados[j] = [est, seg, rows[i][campo[2]]];
            j++;
        }
      } else { // Sentido BA
        if (rows[i][campo[1]] == 'Casa da Musica') { rows[i][campo[1]] = 'Casa da Música'}
        if (rows[i][campo[0]] == 'Casa da Música') { rows[i][campo[0]] = 'Casa da Musica'}
        if (rows[i][campo[1]] == 'Bolhao') { rows[i][campo[1]] = 'Bolhão'}
        if (rows[i][campo[0]] == 'Bolhão') { rows[i][campo[0]] = 'Bolhao'}
        if (rows[i][campo[1]] == 'Campanha') { rows[i][campo[1]] = 'Campanhã'}
        if (rows[i][campo[0]] == 'Campanhã') { rows[i][campo[0]] = 'Campanha'}
        if (rows[i][campo[1]] == 'Estadio do Dragao') { rows[i][campo[1]] = 'Estádio do Dragão'}
        if (rows[i][campo[0]] == 'Estádio do Dragão') { rows[i][campo[0]] = 'Estadio do Dragao'}
        if (rows[i][campo[1]] == 'Estadio do Mar') { rows[i][campo[1]] = 'Estádio do Mar'}
        if (rows[i][campo[0]] == 'Estádio do Mar') { rows[i][campo[0]] = 'Estadio do Mar'}
        if (rows[i][campo[1]] == 'Joao de Deus') { rows[i][campo[1]] = 'João de Deus'}
        if (rows[i][campo[0]] == 'João de Deus') { rows[i][campo[0]] = 'Joao de Deus'}
        if (rows[i][campo[1]] == 'Sao Bento') { rows[i][campo[1]] = 'São Bento'}
        if (rows[i][campo[0]] == 'São Bento') { rows[i][campo[0]] = 'Sao Bento'}
        if (rows[i][campo[1]] == 'D. Joao II') { rows[i][campo[1]] = 'D.João II'}
        if (rows[i][campo[0]] == 'D.João II') { rows[i][campo[0]] = 'D. Joao II'}
        if (rows[i][campo[1]] == 'Combatentes') { rows[i][campo[1]] = 'Lima'}
        if (rows[i][campo[0]] == 'Lima') { rows[i][campo[0]] = 'Combatentes'}
        if (rows[i][campo[1]] == 'Hospital S. Joao') { rows[i][campo[1]] = 'São João'}
        if (rows[i][campo[0]] == 'São João') { rows[i][campo[0]] = 'Hospital S. Joao'}
        if (rows[i][campo[1]] == 'BFonte do Cuco') { rows[i][campo[1]] = 'Fonte do Cuco'}
        if (rows[i][campo[0]] == 'Fonte do Cuco') { rows[i][campo[0]] = 'BFonte do Cuco'}
        if (rows[i][campo[1]] == 'CFonte do Cuco') { rows[i][campo[1]] = 'Fonte do Cuco'}
        if (rows[i][campo[0]] == 'Fonte do Cuco') { rows[i][campo[0]] = 'CFonte do Cuco'}
        if (rows[i][campo[1]] == 'BSra da Hora') { rows[i][campo[1]] = 'Sra da Hora'}
        if (rows[i][campo[0]] == 'Sra da Hora') { rows[i][campo[0]] = 'BSra da Hora'}
        if (rows[i][campo[1]] == 'CSra da Hora') { rows[i][campo[1]] = 'Sra da Hora'}
        if (rows[i][campo[0]] == 'Sra da Hora') { rows[i][campo[0]] = 'CSra da Hora'}
        if (rows[i][campo[1]] == 'CSra da Hora') { rows[i][campo[1]] = 'Sra da Hora'}
        if (rows[i][campo[0]] == 'Sra da Hora') { rows[i][campo[0]] = 'CSra da Hora'}
        if (rows[i][campo[1]] == 'EDos Verdes') { rows[i][campo[1]] = 'Dos Verdes'}
        if (rows[i][campo[1]] == 'Custio') { rows[i][campo[1]] = 'Custió'}
        if (rows[i][campo[0]] == 'Custió') { rows[i][campo[0]] = 'Custio'}
        if (rows[i][campo[1]] == 'Araujo') { rows[i][campo[1]] = 'Araújo'}
        if (rows[i][campo[0]] == 'Araújo') { rows[i][campo[0]] = 'Araujo'}
        if (rows[i][campo[1]] == 'Arvore') { rows[i][campo[1]] = 'Árvore'}
        if (rows[i][campo[0]] == 'Árvore') { rows[i][campo[0]] = 'Arvore'}
        if (rows[i][campo[1]] == 'Candido dos Reis') { rows[i][campo[1]] = 'Cândido dos Reis'}
        if (rows[i][campo[0]] == 'Cândido dos Reis') { rows[i][campo[0]] = 'Candido dos Reis'}
        if (rows[i][campo[1]] == 'Espaco Natureza') { rows[i][campo[1]] = 'Espaço Natureza'}
        if (rows[i][campo[0]] == 'Espaço Natureza') { rows[i][campo[0]] = 'Espaco Natureza'}
        if (rows[i][campo[1]] == 'Alto da Pega') { rows[i][campo[1]] = 'Alto da Pêga'}
        if (rows[i][campo[0]] == 'Alto da Pêga') { rows[i][campo[0]] = 'Alto da Pega'}
        if (rows[i][campo[1]] == 'Castelo da Maia') { rows[i][campo[1]] = 'Castêlo da Maia'}
        if (rows[i][campo[0]] == 'Castêlo da Maia') { rows[i][campo[0]] = 'Castelo da Maia'}
        if (rows[i][campo[1]] == 'Fanzeres') { rows[i][campo[1]] = 'Fânzeres'}
        if (rows[i][campo[0]] == 'Fânzeres') { rows[i][campo[0]] = 'Fanzeres'}
        if (rows[i][campo[1]] == 'Santo Ovidio') { rows[i][campo[1]] = 'Santo Ovídio'}
        if (rows[i][campo[0]] == 'Santo Ovídio') { rows[i][campo[0]] = 'Santo Ovidio'}
        est = pos(rows[i][campo[0]], stationBtms);
        seg = pos(rows[i][campo[1]], stationAtms);
        if (est == 999) { 
            console.log(rows[i]);
            continue;
        }
        if (est == 32 && seg == 23) { seg = 32 }
        if (est == 23 && seg == 53) { est = 53 }
        if (est == 54 && seg == 33) { seg = 54 } // Cândido do Reis - Fonte do Cuco
        if (est == 79 && seg == 37) { seg = 79 } // Boticas - Verdes
        if (est == 42 && seg == 81) { seg = 42 }
        if (est == 81 && seg == 43) { seg = 81 } // Modivas Norte - Modivas Centro
        if (est == 42 && seg == 82) { est = 82 } // Mindelo - Modivas Norte
        if (seg == est) {
            tratados[j] = [est, seg, rows[i][campo[2]]];
            console.log(est, seg, rows[i][campo[2]]);
            j++;
        }
      }
    }
    return tratados;
}

function pos(nome, lista) {
    for (let i = 0; i < lista.length; i++) {
      if (nome == lista[i]) { return i}
    }
    return 999;
}

function dotmsInterv(coords, rows, l1, l2, l3, l4){
    var num;
    tratados = processaResultados(rows);
    for (let i = 0; i < tratados.length; i++) {
        num = tratados[i][2];
        var cor = '#008000';
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
        if (tratados[i][2] > 0) {
            shapes.push(desenhaTroTms(coords, tratados[i], cor));
        }
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
    ate = "0 " + shortv;
    document.getElementById("vermelho").innerHTML = desde + ate;
}
      
function desenhaTroTms(coords, tro, cor){
    k = tro[0];
    let coordsB = { lng: parseFloat((coords[k][3])), 
                    lat: parseFloat((coords[k][2])) };
    let latLngB = new google.maps.LatLng(coordsB);
    let coordsA = { lng: parseFloat((coords[k][1])), 
                    lat: parseFloat((coords[k][0])) };
    let latLngA = new google.maps.LatLng(coordsA);
    var line = new google.maps.Polyline({
        path: [latLngA, latLngB],
        strokeColor: cor,
        strokeOpacity: 1.0,
        strokeWeight: 10,
        map: map
    });
    return line;
}