// Este ficheiro tem de ser colocado em
// https://storage.googleapis.com/bqmaps_public/sp.js
// e ser servido a partir daí
// (i.e., <script src="https://storage.googleapis.com/bqmaps_public/ling.js">)

function ling(l) {
    if (document.getElementById("myDropdown").classList.contains('show')) {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    if (document.getElementById("myDropdownEn").classList.contains('show')) {
        document.getElementById("myDropdownEn").classList.toggle("show");
    }
    if (l == 'uk') {
        lingua = 'en';
        document.querySelector('#por').style.display = 'block';
        document.querySelector('#uk').style.display = 'none';
        document.querySelector('#descr').innerHTML = 
            "Visualizing in a map Oporto metro's demand and supply";
        document.querySelector('#bode').title =
            "To color stations according to the number of trips";
        document.querySelector('#bodeDescr').innerHTML =
            "To view origins / destinations of trips to / from a certain station or group of stations";
        document.querySelector('#bodeDatas').innerHTML =
            "Monthly data since Jan 2018 up to Feb 2021 inc.";
        document.querySelector('#bodv').title =
            "To color stations according to the number of journeys";
        document.querySelector('#bodvDescr').innerHTML =
            "To view origins / destinations of journeys to / from a certain station or group of stations";
        document.querySelector('#bodvDatas').innerHTML =
            "Monthly data since Jan 2018 up to Feb 2021 inc.";
        document.querySelector('#bval').title =
            "To color stations according to the number of validations";
        document.querySelector('#bvalDescr').innerHTML =
            "To view the number of validations in each station";
        document.querySelector('#bvalDatas').innerHTML =
            "Daily data since Jan 2019 up to Feb 2021 inc.";
        document.querySelector('#bcart').title =
            "To color stations according to the number of clients";
        document.querySelector('#bcartDescr').innerHTML =
            "To view the number of different cards used in each station";
        document.querySelector('#bcartDatas').innerHTML =
            "Daily data since Sep 2020 up to Feb 2021 inc.";
        document.querySelector('#bpomp').title =
            "To color stations according to supply or demand";
        document.querySelector('#bpompDescr').innerHTML =
            "To view load, supply or load factor in each stretch";
        document.querySelector('#bpompDatas').innerHTML =
            "Monthly data since Jan 2016 up to Feb 2021 inc.";
        document.querySelector('#btms').title =
            "To color stretches according to supply";
        document.querySelector('#btmsDescr').innerHTML =
            "To view vehicle frequency in each stretch";
        document.querySelector('#btmsDatas').innerHTML =
            "Daily data since  Jan 2016 up to Feb 2021 inc.";
        document.querySelector('#ref').innerHTML =
            ">>> Relevant links in the top left menu <<<";
    } else {
        lingua = 'pt';
        document.querySelector('#por').style.display = 'none';
        document.querySelector('#uk').style.display = 'block';
        document.querySelector('#descr').innerHTML = 
            "Visualização em mapa da procura e oferta no metro do Porto";
        document.querySelector('#bode').title =
            "Colorir estações em função do número de etapas";
        document.querySelector('#bodeDescr').innerHTML =
            "Para visualizar origens / destinos de etapas terminadas / iniciadas em certa estação ou grupo de estações";
        document.querySelector('#bodeDatas').innerHTML =
            "Dados mensais desde Jan 2018 a Fev 2021 inc.";
        document.querySelector('#bodv').title =
            "Colorir estações em função do número de viagens";
        document.querySelector('#bodvDescr').innerHTML =
            "Para visualizar origens / destinos de viagens terminadas / iniciadas em certa estação ou grupo de estações";
        document.querySelector('#bodvDatas').innerHTML =
            "Dados mensais desde Jan 2018 a Fev 2021 inc.";
        document.querySelector('#bval').title =
            "Colorir estações em função do número de validações";
        document.querySelector('#bvalDescr').innerHTML =
            "Para visualizar validações por estação";
        document.querySelector('#bvalDatas').innerHTML =
            "Dados diários desde Jan 2019 a Fev 2021 inc.";
        document.querySelector('#bcart').title =
            "Colorir estações em função do número de clientes";
        document.querySelector('#bcartDescr').innerHTML =
            "Para visualizar número de cartões diferentes usados por estação";
        document.querySelector('#bcartDatas').innerHTML =
            "Dados diários desde Set 2020 a Fev 2021 inc.";
        document.querySelector('#bpomp').title =
            "Colorir estações em função da oferta ou da procura";
        document.querySelector('#bpompDescr').innerHTML =
            "Para visualizar passageiros, oferta ou taxa de ocupação por troço";
        document.querySelector('#bpompDatas').innerHTML =
            "Dados diários desde Jan 2016 a Fev 2021 inc.";
        document.querySelector('#btms').title =
            "Colorir troços em função da oferta";
        document.querySelector('#btmsDescr').innerHTML =
            "Para visualizar número de passagens de veículos por troço";
        document.querySelector('#btmsDatas').innerHTML =
            "Dados mensais desde Jan 2016 a Fev 2021 inc.";
        document.querySelector('#ref').innerHTML =
            ">>> Links relevantes no menu hamburguer no topo superior esquerdo <<<";
    }
}