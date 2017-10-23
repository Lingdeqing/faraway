const util = require('util'),
    http = require('http'),
    url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    res.end(`cors sucess`);
}).listen(8080)