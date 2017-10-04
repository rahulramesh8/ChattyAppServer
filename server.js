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
  wss.broadcast(wss.clients.size);
  console.log("Current size is: ", wss.clients.size)

  ws.on('message', function incoming(message) {

    //Handling MESSAGE from Client
    let messageJS = JSON.parse(message);
    if(messageJS.type == "postMessage") {
      //Making the json string back into a JS object
  
      messageJS["id"] = uuidv1();
      messageJS["type"] = "incomingMessage";
      console.log('type: ' + messageJS["type"] + ' User ' + messageJS["username"] + " said " + messageJS["content"] + " with id: "+ messageJS["id"]);
      message = JSON.stringify(messageJS);
      //Broadcasting message to all clients
      wss.broadcast(message);

    } 
    //Handling NOTIFICATION from client
    else if (messageJS.type == "postNotification") {

      let notificationJS = JSON.parse(message);
      notificationJS["type"] = "incomingNotification";
      console.log('type: ' + notificationJS["type"] + ' content: ' + notificationJS["oldUsername"] + ' has changed to ' + notificationJS["username"]);
      message = JSON.stringify(notificationJS);
      wss.broadcast(message);
    } else {
      console.log("Defaulting on the server side");
    }
    
  });

  //Counting number of connected clients

  var numberOfUsersConnected = 0;
  for (let item of wss.clients) {
    numberOfUsersConnected ++;
  }
  // console.log("Number of connected users: ", numberOfUsersConnected)
  
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log('Client disconnected')
  wss.broadcast(wss.clients.size);
  console.log("Current size is: ", wss.clients.size)
  });

});

// wss.broadcast(numberOfUsersConnected);

// wss.on('connection', function connection(ws) {
//   ws.on('connection', function(message) {
//      wss.broadcast(wss.clients.size);
//      console.log("Current size is: ", wss.clients.size)
//   })
// })


// Function for broadcasting a message
wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    if(client.readyState === client.OPEN) {
      client.send(data);
    }
  });
}
// console.log("Number of users: ", numberOfUsersConnected);
