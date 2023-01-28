var http = require('http');
var url = require('url');
var fs = require('fs');
var consulta = require('./consulta.js');
// var loader = require('@googlemaps/js-api-loader');

const PORT=8080; 
var nin, node, nodv,nval, ncart, npomp, ntms = 0;
var map;
let datasetId = 'od';
let billingProjectId = '';
let odProjectId = '';
let z = 11;
let centro = {lat: 41.15235167, lng: -8.658279444};
let espessura = 2;
      
function mostraHtml (f, response) {
    console.log(f);
    fs.readFile(f,null,function(error,data){
        if(error) 
        {
            response.writeHead(404);
            response.write('File not found');
        }
        else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        }
    });
}
 
function mostraGif (f, response) {
    fs.readFile(f,null,function(error,data){
        if(error) 
        {
            response.writeHead(404);
            response.write('File not found');
        }
        else {
            response.writeHead(200, {'Content-Type': 'image/gif'});
            response.write(data, 'utf-8');
            response.end();
        }
    });
}
 
function onRequest(request,response){
    var q = url.parse(request.url,true).query;
    var p = url.parse(request.url,true).path;
    var queryString = q.queryString;
    var params = q.params;
    var fileToWrite = q.fileToWrite;
    response.writeHead(200, {'content-Type':'text/html'});
    if (fileToWrite){
        console.log(fileToWrite);
        console.log("bqmaps " + new Date().toString().substring(0,34) + ".csv");
        const {Storage} = require('@google-cloud/storage');
        const storage = new Storage();
        const myBucket = storage.bucket('');
        const fileName = "bqmaps " + new Date().toString().substring(0,34) + ".csv"
        const file = myBucket.file(fileName);
        console.log(file.publicUrl());
        file.save(fileToWrite, function(err){
            if (err) throw err;
            console.log('Saved!' + fileName); 
        })
        response.end (JSON.stringify(file.publicUrl()));
        return;
    } else if (p == '/menu') {
        console.log ('menu');
        mostraGif('./resources/menu-icon.gif', response);
    } else if (p == '/por') {
        console.log ('por');
        mostraGif('./resources/Portugal.png', response);
    } else if (p == '/en') {
        console.log ('en');
        mostraGif('./resources/United Kingdom.png', response);
    } else if (params) {
        console.log(params);
        response = consulta.query_in_node (params, response);
    } else if (queryString) {
        console.log(queryString);
        response = consulta.query (queryString, response);
    } else if (p == '/gloss') {
        console.log ('gloss.html');
        mostraHtml('./gloss.html', response);
    } else if (p == '/glossen') {
        console.log ('glossen.html');
        mostraHtml('./glossen.html', response);
    } else if (p == '/sppt') {
        console.log ('sppt.html');
        mostraHtml('./sppt.html', response);
    } else {
        console.log (p);
        mostraHtml('./sppt.html', response);
    }
}

http.createServer(onRequest).listen(PORT);