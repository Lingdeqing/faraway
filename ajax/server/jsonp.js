const util = require('util'),
    http = require('http'),
    url = require('url');

http.createServer(function (req, res) {
    req = url.parse(req.url, true);
    if(!req.query.callback) res.end();
    console.log(`name is ${req.query.name} and age is ${req.query.age}`);
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    var data = JSON.stringify({
        message: 'hello jsonp'
    })
    res.end(`${req.query.callback}(${data})`);
}).listen(8080)