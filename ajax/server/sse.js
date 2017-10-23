const util = require('util'),
    http = require('http'),
    url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache',
        'Access-Control-Allow-Origin':'*'
    });
    var num = 0;
    var f = function () {
        if(num == 10){
            res.write(`event: my-event\n`)
            res.write(`data: third-vent\n`)
            res.write(`id: ${num}\n\n`);
            return res.end();
        } else {
            res.write(`id: ${num}\n`);
            res.write(`data: ${num}\n\n`);
            num ++;
        }
        setTimeout(f, 500);
    };
    f();
}).listen(8080)