// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Currently connected clients
let clients = [];
let clientCount = 0;
let colorList = ['#000080', '#B22222', '#228B22', '#9400D3'];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');

  clientCount ++;
  _broadcast(JSON.stringify(_setUserCount(clientCount)));

  client.send(JSON.stringify(_setFontColor(clientCount)));

  // Initialize a new msg id
  const msgID = uuid();

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('message', (message) => {
    var msg = JSON.parse(message);

    switch(msg.type) {
      case 'postMessage':
        _broadcast(JSON.stringify(_setMessage(msg, msgID)));
        break;

      case 'postNotification':
        _broadcast(JSON.stringify(_setNotification(msg)));
        break;

      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + msg.type);
    }
  });


  client.on('close', () => {
    console.log('Client disconnected')
    clientCount --;
    _broadcast(JSON.stringify(_setUserCount(clientCount)));
  });

});

// Broadcast - Goes through each client and sends message data
_broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
}

// Connection event
_setMessage = (msg, msgID) => {
  // Create msg data
  return ({
    type: "incomingMessage",
    id: msgID,
    username: msg.username,
    content: msg.content,
    fontColor: msg.fontColor
  });
}

_setNotification = (msg) => {
  return ({
    type: "incomingNotification",
    content: msg.content
  });
}

_setUserCount = (userCount) => {
  return ({
    type: "userCountChanged",
    userCount: userCount
  })
}

_setFontColor = (userCount) => {
  return ({
    type: "fontColor",
    fontColor: colorList[userCount%colorList.length]
  })
}


