// Este ficheiro tem de ser colocado em
// https://storage.googleapis.com/bqmaps_public/sp.js
// e ser servido a partir daí
// (i.e., <script src="https://storage.googleapis.com/bqmaps_public/sp.js">)

function toast(message) {
    if (document.querySelector('#menu')) {
        document.querySelector('#menu').style.display = 'none';
    }
    if (document.querySelector('#opt')) {
        document.querySelector('#opt').style.display = 'none';
    }
    var x = document.getElementById("toast");
    x.innerText = message;
    let larg = (window.innerWidth - 32).toString() + 'px';
    x.style.width = larg;
    x.className = "mostra";
}

function dimCab(serv) {
    if (!!document.getElementById('menu')) {   
        document.getElementById('menu').style.zoom = "1.0";
        document.getElementById('menu').style.top = "180px";
    }
    let altura = (window.innerHeight - 84).toString() + 'px';
    if (window.innerWidth < 700) {
        altura = ((window.innerHeight - 57)/0.7).toString() + 'px';
        document.getElementById('map').style.height = "100%";
        document.getElementById('map').style.top = "81px";
        if (!document.getElementById('inic').style.display == 'none') {
            document.getElementById('Cab').style.display = 'none';
        } else {
            document.getElementById('opt').style.height = altura;
            document.getElementById('descr').style.fontSize = '14px';
            document.getElementById('bqmaps').style.fontSize = '14px';
            document.getElementById('bqmaps').style.paddingLeft = '10px';
            document.getElementById('myImage').width = '20';
            document.getElementById('myImage').height = '25';
            document.getElementById('uk').width = '20';
            document.getElementById('uk').height = '20';
            document.getElementById('por').width = '20';
            document.getElementById('por').height = '20';
            document.getElementById('Cab').style.height = "81px"; // 54 ou 81
            document.getElementById('opt').style.marginTop = "122px"; // 81 ou 118
            document.getElementById('opt').style.zoom = "0.7";
            let l = document.querySelectorAll('.botserv');
            for (let p=0; p < l.length; p++) {
                l[p].style.paddingLeft = "100px";
            }
        }
    } else {
        document.getElementById('map').style.top = "74px";
        altura = (window.innerHeight - 74).toString() + 'px';
        document.getElementById('opt').style.height = altura;
        document.getElementById('descr').style.fontSize = '20px';
        document.getElementById('bqmaps').style.fontSize = '20px';
        document.getElementById('bqmaps').style.paddingLeft = '60px';
        document.getElementById('myImage').width = '40';
        document.getElementById('myImage').height = '50';
        document.getElementById('uk').width = '40';
        document.getElementById('uk').height = '40';
        document.getElementById('por').width = '40';
        document.getElementById('por').height = '40';
        document.getElementById('Cab').style.height = "84px"; // estava 74
        document.getElementById('opt').style.marginTop = "84px"; // estava 74
        document.getElementById('opt').style.zoom = "1.0";
        let l = document.querySelectorAll('.botserv');
        for (let p=0; p < l.length; p++) {
            l[p].style.paddingLeft = "200px";
        }
    }
    if (window.innerWidth < 400 && !!document.getElementById('menu')) {
        document.getElementById('menu').style.zoom = "0.8";
        document.getElementById('menu').style.top = "300px";
    }
}

function inicializaGlobal() {    
    // Mostra as vistas do cabeçalho e dos serviços existentes
    // Esconde as outras
    document.querySelector('#inic').style.display = 'none';
    document.querySelector('#inicen').style.display = 'none';
    document.querySelector('#opt').style.display = 'block';
    document.querySelector('#map').style.display = 'none';
    if (document.querySelector('#menu')) {
        document.querySelector('#menu').style.display = 'none';
    }
    if (lingua == 'pt') {
        document.querySelector('#por').style.display = 'none';
        document.querySelector('#uk').style.display = 'block';
    } else {
        document.querySelector('#uk').style.display = 'none';
        document.querySelector('#por').style.display = 'block';
    }
    document.querySelector('#Cab').style.display = 'block';
    document.getElementById('Cab').style.position = "fixed";
    document.getElementById('Cab').style.zIndex = '-1';
    dimCab();
    nin =+ 1;
}

function ecraServ() {
    // Mostra as vistas do cabeçalho, do painel de input e do mapa
    // Esconde as outras
    document.querySelector('#inic').style.display = 'block';
    document.querySelector('#inicen').style.display = 'block';
    document.querySelector('#opt').style.display = 'none';
    document.querySelector('#map').style.display = 'block';
    document.querySelector('#menu').style.display = 'block';
    document.querySelector('#Cab').style.display = 'block';
    document.getElementById('Cab').style.zIndex = '';   
    document.getElementById('stats').style.opacity = "1";
    dimCab(serv);
}

function limpaMapa() {
    // for (shape in shapes) diz que shape.setMap is not a function!
    shapes.forEach ((shape) => {
        if (shape != '') {
            shape.setMap(null); // desliga forma do mapa
            shape = null; // anula forma
        }
    });
    shapes = []; // anula array de formas
    limpaLegenda();
}

// apaga formas do mapa assim que se começa a alterar um dos inputs
const inputAlterado = (event) => {
    console.log(escuta, shapes);
    if (shapes == []) { return };
    if (event.target.matches('href')) { return }; // botões verdes
    limpaMapa();
    console.log(escuta, shapes);
}

function limpaLegenda() {
    if (document.getElementById("pedido") == null) { return};
    document.getElementById("pedido").innerHTML = "Legenda: ";
    document.getElementById("verdescuro").innerHTML = "...";
    document.getElementById("verdeclaro").innerHTML = "...";
    document.getElementById("amarelo").innerHTML = "...";
    document.getElementById("laranja").innerHTML = "...";
    document.getElementById("vermelho").innerHTML = "...";
}

function criaEscuta() {
    console.log('Criando escuta');
    document.getElementById('menu').addEventListener('click', inputAlterado);
    escuta = true;
    console.log('escuta criada');
}

function download() {
    console.log(shapes);
    if (shapes.length == 0) { // se não há nada para mostrar...
        toast('Necessário fazer uma consulta que produza resultados (botão Colorir) para serem mostrados e gravados!');
        setTimeout(function() { 
            document.getElementById("toast").classList.remove("mostra"); // apagar o toast
            document.querySelector('#menu').style.display = 'block'; // voltar a mostrar o painel
        }, 4000); // após 4 segundos
        return;
    }
    console.log(fileName);  
    window.open (fileName,'_blank');
}
      
function clar(){
    if(!lar){
      document.getElementById("lar").style.background = "orange";
      lar = 1;
    } else {
      document.getElementById("lar").style.background = "#F0F0F0";
      lar = 0;
    }
}      

function cazu(){
    if(!azu){
      document.getElementById("azu").style.background = "blue";
      document.getElementById("azu").style.color = "white";
      azu = 1;
    } else {
      document.getElementById("azu").style.background = "#F0F0F0";
      document.getElementById("azu").style.color = "black";
      azu = 0;
    }
}  

function cverm(){
    if(!verm){
      document.getElementById("verm").style.background = "red";
      document.getElementById("verm").style.color = "white";
      verm = 1;
    } else {
      document.getElementById("verm").style.background = "#F0F0F0";
      document.getElementById("verm").style.color = "black";
      verm = 0;
    }
}  

function cviol(){
    if(!viol){
      document.getElementById("viol").style.background = "purple";
      document.getElementById("viol").style.color = "white";
      viol = 1;
    } else {
      document.getElementById("viol").style.background = "#F0F0F0";
      document.getElementById("viol").style.color = "black";
      viol = 0;
    }
}  

function cverd(){
    if(!verd){
      document.getElementById("verd").style.background = "green";
      document.getElementById("verd").style.color = "white";
      verd = 1;
    } else {
      document.getElementById("verd").style.background = "#F0F0F0";
      document.getElementById("verd").style.color = "black";
      verd = 0;
    }
}  

function ctc(){
    if(!tc){
      document.getElementById("tc").style.background = "gray";
      document.getElementById("tc").style.color = "white";
      tc = 1;
    } else {
      document.getElementById("tc").style.background = "#F0F0F0";
      document.getElementById("tc").style.color = "black";
      tc = 0;
    }
}  

function cvevi(){
    if(!vevi){
      document.getElementById("vevi").style.background = "red";
      document.getElementById("vevi").style.fontWeight = "bold";
      document.getElementById("vevi").style.color = "purple";
      vevi = 1;
    } else {
      document.getElementById("vevi").style.background = "#F0F0F0";
      document.getElementById("vevi").style.fontWeight = "normal";
      document.getElementById("vevi").style.color = "black";
      vevi = 0;
    }
}  

function camar(){
    if(!amar){
      document.getElementById("amar").style.background = "yellow";
      amar = 1;
    } else {
      document.getElementById("amar").style.background = "#F0F0F0";
      amar = 0;
    }
}

function completaLest(lest){
    if (lar == 1) { lest.push("Lar") }
    if (azu == 1) { lest.push("Az") }
    if (verm == 1) { lest.push("Verm") }
    if (verd == 1) { lest.push("Verd") }
    if (vevi == 1) { lest.push("tc") }
    if (viol == 1) { lest.push("Viol") }
    if (tc == 1) { lest.push("TC") }
    if (amar == 1) { lest.push("Amar") }
    return lest;
}

function alerta(x) {
    if (lingua == 'pt') {
        alert( x + " inaceitável.");
    } else {
        alert( x + " unacceptable.");
    }
}

function limpa(lista, inf, sup){
  var nova = [];
  for (let i = 0; i < lista.length; i++) {
      if (Number.isInteger(parseInt(lista[i]))) {
          if (parseInt(lista[i]) < inf || parseInt(lista[i]) > sup) {
              alerta(lista[i]);
          } else {
              nova.push(lista[i]);
          }
      };
  }
  return nova;
}

function limpaloc(lista){
    var nova = [];
    for (let i = 0; i < lista.length; i++) {
        if (Number.isInteger(parseInt(lista[i]))) {
            if (parseInt(lista[i]) < 0 || parseInt(lista[i]) > 226) {
                alerta(lista[i]);
            } else {
                nova.push(lista[i]);
            }
        };
    }
    return nova;
}

function limInicRank() {
    document.getElementById('l1').value = '10';
    document.getElementById('l2').value = '20';
    document.getElementById('l3').value = '62';
    document.getElementById('l4').value = '72';
}

function buscaLim(r) {
    console.log(r);
    document.getElementById('l1').value = r[0];
    document.getElementById('l2').value = r[1];
    document.getElementById('l3').value = r[2];
    document.getElementById('l4').value = r[3];         
}

function limInicInterv() {
    console.log(serv);
    switch(serv) {
        case 'ode':
            buscaLim(refLim['ode']);
            break;
        case 'odv':
            buscaLim(refLim['odv']);
            break;
        case 'val':
            buscaLim(refLim['val']);
            break;
        case 'cart':
            buscaLim(refLim['cart']);
            break;
        case 'pomp':
            buscaLim(refLim['pomp'][document.getElementById("v").selectedIndex]);
            break;
        case 'tms':
            buscaLim(refLim['tms'][document.getElementById("v").selectedIndex]);
            break;
        default:
            buscaLim([4, 3, 2, 1]);
        }
}

function odeVmax(lim) {
    if (lim == 'l1') {
        subs = parseInt(document.getElementById('l2').value);
    } else {
        l = 'l' + parseInt(lim[1] - 1);
        subs = parseInt(document.getElementById(l).value);
    }
    if (serv == 'pomp' || serv == 'tms') {
        if (document.getElementById("intervT").checked)  { return [999999, subs]; }
    }
    if (serv != 'tms')  {
        if (document.getElementById("interv").checked)  { return [999999, subs]; } 
    }
    if (serv != 'odv') { // ranking, todos os serviços excepto odv
        vmax = 82;
    } else { // ranking, serviço odv
        vmax = 82;
        if(document.getElementById("or").checked) {
            vmax = 134;
        }
    }
    return [vmax, subs];
}

function valid(lim){
    // validação dos limiares fronteira das cores
    // variam com os serviços e com o tipo de limiares (ranking vs intervalo)
    // (serv é variável global)
    
    let txt = parseInt(document.getElementById(lim).value);
    let vmin = 0;
    let [vmax, subs] = odeVmax(lim);
    let b = (txt>vmin) && (txt<vmax);
    if (   !b 
        || (vmax == 999999 && subs < txt && lim != 'l1')
        ||  (vmax == 999999 && subs > txt && lim == 'l1')
        || (vmax != 999999 && subs > txt && lim != 'l1')
        || (vmax != 999999 && subs < txt && lim == 'l1') ) {
        if (lingua == 'pt') {
            alert('Limite de ' + txt + " inaceitável; substituído por " + subs + '.');
        } else {
            alert(txt + " as a limit is unacceptable; replaced by " + subs + ".");
        }
        document.getElementById(lim).value = subs;
        return subs;
    }
    return parseInt(txt);
}

function reordena(l1, l2, l3, l4) {
/*    if(document.getElementById("rank").checked){
        if(l2<l1) { l2 = l1 }
        if(l3<l2) { l3 = l2 }
        if(l4<l3) { l4 = l3 }
    } else {
        if(l2>l1) { l2 = l1 }
        if(l3>l2) { l3 = l2 }
        if(l4>l3) { l4 = l3 }
    } */
    return [l1, l2, l3, l4];
}

function completEst(est){
  if(lar == 1){
      for (let i = 0; i<10; i++) { est.push(i) }
  }
  if(azu == 1){
      for (let i = 24; i<33; i++) { est.push(i) }
  }
  if(vevi == 1){
      for (let i = 33; i<38; i++) { est.push(i) }
  }
  if(verm == 1){
      for (let i = 38; i<55; i++) { est.push(i) }
  }
  if(tc == 1){
      for (let i = 10; i<24; i++) { est.push(i) }
  }
  if(verd == 1){
      for (let i = 55; i<66; i++) { est.push(i) }
  }
  if(amar == 1){
      for (let i = 66; i<81; i++) { est.push(i) }
  }
  if(viol == 1){
      for (let i = 81; i<83; i++) { est.push(i) }
  }
  return est;
}

function haEstMP(lista){
    if (!lista) { return false}
    for (i=0; i<lista.length; i++){
        if (lista[i] < 83) {return true}
    }
    return false
}
  
function limparResultados(rows){
    campo = Object.keys(rows); 
    for (var i=rows.length-1; i>=0; i--){
        if (rows[i][campo[0]] > 82) {
            // elimina esta linha de resultados
            rows.splice(i,1);
        }
    }
    return rows;
}

function desenhaCirc(f, cor){
  campo = Object.keys(f); 
  let coords = { lat: parseFloat(f[campo[1]]), lng: parseFloat(f[campo[2]]) };
  if (isNaN(coords.lat)) { return ''};
  let latLng = new google.maps.LatLng(coords);
  var circulo = new google.maps.Circle({
      strokeColor:  cor,
      strokeOpacity: 0.8,
      strokeWeight: espessura,
      fillColor:  cor,
      map: map,
      center: latLng,
      radius: 250
  });
  return circulo;
}

function desenhaQuad(norte, oeste, cor){
    var quadrado = new google.maps.Rectangle({
        strokeColor:  cor,
        strokeOpacity: 0.8,
        strokeWeight: espessura,
        fillColor:  cor,
        map: map,
        bounds: {
            north: norte + 1/220,
            south: norte - 1/220,
            west: oeste - 1/160,
            east: oeste + 1/160
        }
    });
    return quadrado;
  }