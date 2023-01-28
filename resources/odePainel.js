// Este ficheiro tem de ser colocado em
// https://storage.googleapis.com/bqmaps_public/odePainel.js
// e ser servido a partir daí
// (i.e., <script src="https://storage.googleapis.com/bqmaps_public/odePainel.js">)

function odePainel() {
// constrói o painel de input do serviço ode
    const menu = 
        '<div id="menu">' + 
            '<table class="menu" style="border-collapse: collapse;">' +
                '<tr class="help"><td class="bgrd"></td>' +
                    '<td class="bgrd" style="padding-left: 30px">' +
                        '<a class="bgrd" href="https://docs.google.com/presentation/d/1bCbJ-ZYCCzn5qSMWc5r3NGBR6OrQhV3NhXVz1kL7pXs/edit?usp=sharing">' +
                        '<button style="padding: 1px 15px"' +
                                'type="button"> Ajuda </button></a></td>' +
                    '<td class="bgrd">' +
                        '<a href="https://docs.google.com/presentation/d/1U45_tRHIsJbDhsu8pzeCQqH4ACjtRpnrGGVUxC_jviA/edit?usp=sharing">' +
                        '<button type="button"> Help </button></a></td>' +
                '</tr>' +
                '<tr class="action">' +
                    '<td class="bgrd">' +
                        '<h3 class="bgrd">' +
                            'Colorir estações em função do número de etapas </h3></td>' +
                    '<td class="bgrd" style="padding-left: 30px">' +
                        '<button style="padding: 1px 12px" ' +
                                'type="button" onclick="odeQuery()"> Colorir </button></td>' +
                    '<td class="bgrd" >' +
                        '<button type="button" onclick="download()"> CSV </button></td>' +
                '</tr>' +
            '</table>' +
            '<table>' +
                '<tr>' +
                    '<td class="bgrd" style="vertical-align: top">' +
                        'Usando como critério:  </td>' +
                    '<td class="bgrd" style="vertical-align: top; padding-bottom: 10px">' +
                        '<input type="radio" id="rank" name="rankint" value="Ranking"' +
                        'onclick="limInicRank()" checked="checked"> ' +
                        '<span style="vertical-align: top">Ranking</span>' +
                        '<input type="radio" id="interv" name="rankint" value="Intervalo"' +
                        'onclick="limInicInterv()"> ' +
                        '<span style="vertical-align: top;"> Intervalo </span></td>' +
                '</tr>' +
            '</table>' +
            '<table>' +
                '<tr>' +
                    '<td class="bgrd" style="padding-bottom: 10px"> Limites: </td>' +
                    '<td class="bgrd" style="padding-bottom: 10px">' +
                        '<input type="text" id="l1" value="10" maxlength="6" size="3" onfocusout="valid(&quot;l1&quot;)">' +
                    '</td>' +
                    '<td class="bgrd" style="padding-bottom: 10px">' +
                        '<input type="text" id="l2" value="20" maxlength="6" size="2" onfocusout="valid(&quot;l2&quot;)">' +
                    '</td>' +
                    '<td class="bgrd" style="padding-bottom: 10px">' +
                        '<input type="text" id="l3" value="62" maxlength="6" size="2" onfocusout="valid(&quot;l3&quot;)">' +
                    '</td>' +
                    '<td class="bgrd" style="padding-bottom: 10px">' +
                        '<input type="text" id="l4" value="72" maxlength="6" size="2" onfocusout="valid(&quot;l4&quot;)">' +
                    '</td>' +
                '</tr>' +
            '</table>' +
            '<table class="serv">' +
                '<tr>' +
                    '<td class="bgrd" style="vertical-align: top; text-align: left;">Dias:  </td>' +
                    '<td class="bgrd" style="vertical-align: top;" >' +
                        '<input type="radio" id="todos" name="dias" value="Todos">' +
                        '<span style="vertical-align: top;"> Todos</span>' +
                        '<input type="radio" id="uteis" name="dias" value="Úteis" checked="checked">' +
                        '<span style="vertical-align: top;">Úteis</span></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd" style="text-align: left;">Anos:  </td>' +
                    '<td class="bgrd">' +
                        '<input type="text" id="Anos" value="2019 2020">' +'</td>' +
                    '<td class="bgrd" style="width: 75px">' +
                        '<button style="padding: 1px 10px"' +
                        'type="button" title="Colorir estações em função do número de viagens" onclick="odvSP()"> OD Vi </button></a></td>' +
                    '<td class="bgrd">' +
                        '<button style="padding: 1px 8px"' +
                        'type="button" title="Colorir troços em função da procura e/ou oferta"' +
                        'onclick="pompSP()"> PO </button></a></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd" style="text-align: left;">Meses: </td>' +
                    '<td class="bgrd" >' +
                        '<input type="text" id="Meses" value="5"></td>' +
                    '<td class="bgrd">' +
                        '<button style="padding: 1px 12px"' + 
                        'type="button" title="Colorir estações em função do número de validações"' +
                        'onclick="valSP()"> Valid </button></a></td>' +
                    '<td class="bgrd">' +
                        '<button style="padding: 1px 3px"' +
                        'type="button" title="Colorir troços em função da oferta (DETALHES)"' +
                        'onclick="tmsSP()"> TMS </button></a></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd" style="text-align: left; padding-bottom: 10px">Horas:  </td>' +
                    '<td class="bgrd" style="padding-bottom: 10px">' +
                        '<input type="text" id="Horas" value="7 8 9">' +'</td>' +
                    '<td class="bgrd" style="padding-bottom: 10px">' +
                        '<button style="padding: 1px 18px"' + 
                        'type="button" title="Colorir estações em função do número de clientes"' +
                        'onclick="cartSP()">Cart </button></a></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd" style="vertical-align: top;">Etapas com:  </td>' +
                    '<td class="bgrd" style="vertical-align: top;">' +
                        '<input type="radio" id="or" name="od" value="Origem"  checked="checked">' +
                        '<span style="vertical-align: top;"> Origem</span>' +
                        '<input type="radio" id="de" name="od" value="Destino">' +
                        '<span style="vertical-align: top;">Destino</span></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd">' +
                        'Na estação n.º:   </td>' +
                    '<td class="bgrd" >' +
                        '<input type="text" id="Est" value="0"</td>' +
                '</tr>' +
            '</table>' +
            '<div id="btn-group">' +
                '<button id="lar" onclick="clar()">La</button>' +
                '<button id="azu" onclick="cazu()">Az</button>' +
                '<button id="verm" onclick="cverm()">Verm</button>' +
                '<button id="viol" onclick="cviol()">Vi</button>' +
                '<button id="verd" onclick="cverd()">Verd</button>' +
                '<button id="tc" onclick="ctc()">TC</button>' +
                '<button id="vevi" onclick="cvevi()">tc</button>' +
                '<button id="amar" onclick="camar()">Am</button>' +
            '</div>' +
            '<p id="pedido" style="max-width:400px; padding-top: 30px;  margin-left: 10px;"></p>' +
            '<p id="verdescuro" class="legenda" style="color:#FFFFFF; background-color:#008000"></p>' +
            '<p id="verdeclaro" class="legenda" style="color:#000000; background-color:#00FF00"</p>' +
            '<p id="amarelo" class="legenda" style="color:#000000; background-color:#FFDF00"</p>' +
            '<p id="laranja" class="legenda" style="color:#FFFFFF; background-color:#FF8C00"</p>' +
            '<p id="vermelho" class="legenda" style="color:#FFFFFF; background-color:#FF0000"</p>' +
        '</div>'
 
    return menu;
}