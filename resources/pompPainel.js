// Este ficheiro tem de ser colocado em
// https://storage.googleapis.com/bqmaps_public/odePainel.js
// e ser servido a partir daí
// (i.e., <script src="https://storage.googleapis.com/bqmaps_public/pompPainel.js">)

function pompPainel() {
// constrói o painel de input do serviço pomp
    const menu = 
        '<div id="menu">' + 
            '<table class="menu" style="border-collapse: collapse;">' +
                '<tr class="help">' +
                    '<td class="bgrd"></td>' +
                    '<td class="bgrd" style="padding-left: 240px">' +
                        '<a class="bgrd" href="https://docs.google.com/presentation/d/1bCbJ-ZYCCzn5qSMWc5r3NGBR6OrQhV3NhXVz1kL7pXs/edit?usp=sharing">' +
                        '<button style="padding: 1px 15px"' +
                                'type="button"> Ajuda </button></a></td>' +
                    '<td class="bgrd">' +
                        '<a href="https://docs.google.com/presentation/d/1U45_tRHIsJbDhsu8pzeCQqH4ACjtRpnrGGVUxC_jviA/edit?usp=sharing">' +
                        '<button type="button"> Help </button></a></td>' +
                '</tr>' +
            '</table>' +
            '<table>' +
                '<tr class="action">' +
                    '<td class="bgrd">' +
                        '<h3 class="bgrd" style="text-align: left";>' +
                            'Colorir troços em função de: </h3></td>' +
                    '<td class="bgrd"><label for="v">Escolha variável </label>' +
                    '<select name="v" id="v">' +
                        '<option value="Pax AB">Pax AB/para Trindade</option>' +
                        '<option value="Pax BA">Pax BA/de Trindade</option>' +
                        '<option value="Pax">Pax</option>' +
                        '<option value="Passagens ET AB">Passagens ET AB</option>' +
                        '<option value="Passagens ET BA">Passagens ET BA</option>' +
                        '<option value="Passagens TT AB">Passagens TT AB</option>' +
                        '<option value="Passagens TT BA">Passagens TT BA</option>' +
                        '<option value="Lugares AB">Lugares AB</option>' +
                        '<option value="Lugares BA">Lugares BA</option>' +
                        '<option value="Tx Ocupação AB">Tx Ocupação AB</option>' +
                        '<option value="Tx Ocupação BA">Tx Ocupação BA</option>' +
                        '<option value="Tx Ocupação Max">Tx Ocupação Max</option>' +
                    '</select></td>' +
                    '<td class="bgrd">' +
                        '<button style="padding: 1px 5px" ' +
                                'type="button" onclick="poQuery()"> Colorir </button></td>' +
                    '<td class="bgrd" >' +
                        '<button type="button" onclick="download()"> CSV </button></td>' +
                '</tr>' +
            '</table>' +
            '<label style="padding-top: 10px">A: (FNZ SOV) --- B: (SMT AER PVZ ISM HSJ)</label><br><br>' +
            '<table>' +
                '<tr>' +
                    '<td class="bgrd">' +
                        '<span style="float: left; vertical-align:top">Usando como critério:</span>' +
                        '<input type="radio" id="rank" name="rankint" value="Ranking"' +
                        'onclick="limInicRank()" checked="checked"' +
                        'style="margin-left: 120px";>' +
                        '<span style="vertical-align:top;">Ranking</span></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd" style="vertical-align:top;">' +
                        '<input type="radio" id="interv" name="rankint" value="Intervalo AB"' +
                        'onclick="limInicInterv()"> ' +
                        '<span style="vertical-align:top;">Intervalo AB</span>' +
                        '<input type="radio" id="intervT" name="rankint" value="Intervalo T"' +
                        'onclick="limInicInterv()"' +
                        'style="margin-left: 40px";>' +
                        '<span style="vertical-align:top;">Intervalo de/para Trindade</span></td>' +
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
                    '<td class="bgrd" style="text-align:left">Dias:  </td>' +
                    '<td class="bgrd">' +
                        '<input type="radio" id="todos" name="dias" value="Todos"' +
                        ' style="vertical-align:top;"> Todos' +
                        '<input type="radio" id="uteis" name="dias" value="Úteis"' +
                        'style="vertical-align:top;" checked="checked"> Úteis</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd" style="text-align: left;">Anos:  </td>' +
                    '<td class="bgrd">' +
                        '<input type="text" id="Anos" value="2019 2020">' +'</td>' +
                    '<td class="bgrd" style="padding-left: 4px">' +
                        '<button onclick="odeSP()"' +
                        'type="button" title="Colorir troços em função do número de etapas">' +
                        ' OD Et </' + 'button></a></td>' +
                    '<td class="bgrd">' +
                        '<button type="button" ' +
                        'title="Colorir troços em função do número de validaçõess"' +
                        'onclick="valSP()"> Valid </' + 'button></a></td>' +
                '</tr>' +
                    '<td class="bgrd" style="text-align: left;">Meses:  </td>' +
                    '<td class="bgrd">' +
                        '<input type="text" id="Meses" value="5">' +'</td>' +
                    '<td class="bgrd" style="padding-left: 4px;">' +
                        '<button onclick="odvSP()"' +
                        'type="button" title="Colorir troços em função do número de viagens">' +
                        ' OD Vi </' + 'button></a></td>' +
                    '<td class="bgrd">' +
                        '<button style="padding: 1px 7px"' +
                        'type="button" title="Colorir troços em função da oferta (DETALHES)"' +
                        'onclick="tmsSP()"> TMS </button></a></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd" style="text-align: left; padding-bottom: 10px;">Horas: </td>' +
                    '<td class="bgrd" style="padding-bottom: 10px;">' +
                        '<input type="text" id="Horas" value="7 8 9"></td>' +
                    '<td class="bgrd" style="padding-bottom: 10px; padding-left: 7px;">' +
                        '<button style="padding: 1px 10px" onclick="cartSP()" ' + 
                        'type="button" title="Colorir estações em função do número de cartões diferentes usados">' +
                        ' Cart </button></a></td>' +
                '</tr>' +
            '</table>' +
            '<p id="pedido" style="max-width:400px; padding-top: 30px;  margin-left: 10px;"></p>' +
            '<p id="verdescuro" class="legenda" style="color:#FFFFFF; background-color:#008000"></p>' +
            '<p id="verdeclaro" class="legenda" style="color:#000000; background-color:#00FF00"</p>' +
            '<p id="amarelo" class="legenda" style="color:#000000; background-color:#FFDF00"</p>' +
            '<p id="laranja" class="legenda" style="color:#FFFFFF; background-color:#FF8C00"</p>' +
            '<p id="vermelho" class="legenda" style="color:#FFFFFF; background-color:#FF0000"</p>' +
        '</div>'
 
    return menu;
}