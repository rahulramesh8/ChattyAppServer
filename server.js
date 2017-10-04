// server.js


const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', function incoming(message) {

    //Making the json string back into a JS object
    messageJS = JSON.parse(message);

    messageJS["id"] = uuidv1();

    console.log('User ' + messageJS["username"] + " said " + messageJS["content"] + " with id: "+ messageJS["id"]);
    message = JSON.stringify(messageJS);

    //Broadcasting to all clients
    wss.broadcast(message);

    
  });
  
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// Function for broadcasting a message
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    if(client.readyState === client.OPEN) {
      console.log("Im inside the broadcast function")
      client.send(data);
    }
  });
}
