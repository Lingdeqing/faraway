const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({port: 8080});
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message)
    });

    ws.send('something from server');
})