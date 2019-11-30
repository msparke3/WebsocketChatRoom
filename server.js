

const WebSocket = require('ws');

// starts server instance on http://localhost:8080
const wss = new WebSocket.Server({ port: 8080 });

const history = []
var that = this

// waits for connection to be established from the client
// the callback argument ws is a unique for each client
wss.on('connection', (ws) => {

  
  // runs a callback on message event
  ws.on('message', (data) => {
    if(data === "ready"){
      history.forEach(el => ws.send(el))
    }
    else{
      history.push(data);
      // sends the data to all connected clients
      wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
      });
    }
    
  });
});

var express = require('express');
var app = express();

app.use(express.static('client'));


app.listen(80, function() {
  console.log('Example app listening on port 80!');
});