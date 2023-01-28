// Este ficheiro tem de ser colocado em
// https://storage.googleapis.com/bqmaps_public/odePainel.js
// e ser servido a partir daí
// (i.e., <script src="https://storage.googleapis.com/bqmaps_public/valPainel.js">)

function valPainel() {
// constrói o painel de input do serviço val
    const menu = 
        '<div id="menu" style="max-width:425px">' + 
            '<table class="menu" style="border-collapse: collapse;">' +
                '<tr class="help"><td class="bgrd"></td>' +
                    '<td class="bgrd" style="padding-left: 0px">' +
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
                            'Colorir estações em função do número de validações </h3></td>' +
                    '<td class="bgrd" style="padding-left: 7px">' +
                        '<button style="padding: 1px 5px" ' +
                                'type="button" onclick="valQuery()"> Colorir </button></td>' +
                    '<td class="bgrd" >' +
                        '<button type="button" onclick="download()"> CSV </button></td>' +
                '</tr>' +
            '</table>' +
            '<table>' +
                '<tr>' +
                    '<td class="bgrd" style="vertical-align:top; padding-bottom: 10px">' +
                        'Usando como critério:  </td>' +
                    '<td class="bgrd" style="vertical-align:top; padding-bottom: 10px">' +
                        '<input type="radio" id="rank" name="rankint" value="Ranking"' +
                        'onclick="limInicRank()" checked="checked">' +
                        '<span style="vertical-align:top;">Ranking</span>' +
                        '<input type="radio" id="interv" name="rankint" value="Intervalo"' +
                        'onclick="limInicInterv()"> ' +
                        '<span style="vertical-align:top;">Intervalo </span></td>' +
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
            '<table>' +
                '<tr>' +
                    '<td class="bgrd">DSem:  </td>' +
                    '<td class="bgrd"><input type="text" id="Tipo"></td>' +
                    '<td class="bgrd"><button style="padding: 1px 19px" id="fer" onclick="cfer()"> Fer.</button></td>' +
                    '<td class="bgrd"><button style="padding: 1px 10px" id="nfer" onclick="cnfer()">Não</button></td>' +
                '</tr>' +
            '</table>' +
            '<table class="serv">' +
                '<tr>' +
                    '<td class="bgrd" style="text-align: left;">Anos:  </td>' +
                    '<td class="bgrd">' +
                        '<input type="text" id="Anos" value="2020">' +'</td>' +
                    '<td class="bgrd" style="width: 40px">' +
                        '<button style="padding: 1px 12px" onclick="odeSP()"' +
                        'type="button" title="Colorir troços em função das validações"> OD Et </' + 'button></a></td>' +
                    '<td class="bgrd">' +
                        '<button style="padding: 1px 7px"' +
                        'type="button" title="Colorir troços em função das validações"' +
                        'onclick="cartSP()"> Cart </' + 'button></a></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd" style="text-align: left;">Meses: </td>' +
                    '<td class="bgrd">' +
                        '<input type="text" id="Meses" value="5"></td>' +
                    '<td class="bgrd">' +
                        '<button style="width: 60px; padding: 1px 8px" onclick="odvSP()" ' + 
                        'type="button" title="Colorir estações em função do número de viagens"> OD Vi </button></a></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd">Horas:  </td>' +
                    '<td class="bgrd">' +
                        '<input type="text" id="Horas" value="8">' +'</td>' +
                    '<td class="bgrd">' +
                        '<button style="padding: 1px 20px"' + 
                        'type="button" title="Colorir estações em função da procura e/ou oferta"' +
                        'onclick="pompSP()"> PO </button></a></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="bgrd" style="padding-bottom: 7px">DMês:  </td>' +
                    '<td class="bgrd">' +
                        '<input type="text" id="DMes"></td>' +
                    '<td class="bgrd">' +
                        '<button type="button" style="width:65px; padding: 1px 3px;" ' +
                        'title="Colorir troços em função da oferta (DETALHES)"' +
                        'onclick="tmsSP()"> TMS </button></a></td>' +
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