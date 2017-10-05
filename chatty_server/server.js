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
// TODO: add more colors for user's color
let colorList = ['#000080', '#B22222', '#228B22', '#9400D3'];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');

  clientCount ++;
  // Send online users number to all peers
  _broadcast(JSON.stringify(_setUserCount(clientCount)));
  // Send font color of current user to all peers
  client.send(JSON.stringify(_setFontColor(clientCount)));

  // Initialize a new msg id
  const msgID = uuid();

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('message', (message) => {
    var msg = JSON.parse(message);

    switch(msg.type) {
      // send text message
      case 'postMessage':
        _broadcast(JSON.stringify(_setMessage(msg, msgID)));
        break;
      // send notification
      case 'postNotification':
        _broadcast(JSON.stringify(_setNotification(msg)));
        break;
      // send text with image
      case 'postImage':
        _broadcast(JSON.stringify(_setImageLink(msg, msgID)));
        break;

      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + msg.type);
    }
  });

  // Client close the app (tab or window)
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

// Set msg data
_setMessage = (msg, msgID) => {
  return ({
    type: "incomingMessage",
    id: msgID,
    username: msg.username,
    content: msg.content,
    fontColor: msg.fontColor
  });
}

// Set msg + img data
_setImageLink = (msg, msgID) => {
  return ({
    type: "incomingImage",
    id: msgID,
    username: msg.username,
    content: msg.content,
    imgUrl: msg.imgUrl,
    fontColor: msg.fontColor
  });
}

// Set notification
_setNotification = (msg) => {
  return ({
    type: "incomingNotification",
    content: msg.content
  });
}

// Set number of users online
_setUserCount = (userCount) => {
  return ({
    type: "userCountChanged",
    userCount: userCount
  })
}

// Set font color of each user
_setFontColor = (userCount) => {
  return ({
    type: "fontColor",
    fontColor: colorList[userCount%colorList.length]
  })
}


