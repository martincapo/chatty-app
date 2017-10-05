# Chatty App

Chatty will allow users to communicate with each other without having to register accounts. It will use React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

## Screenshot

!["Screenshot description"](URL)


## Getting Started

1. Fork and clone your fork of this repository.
2. Install dependencies: `npm install` or `npm i` for short.
3. From the root project folder, launch the chat application: `npm start`
4. Navigate to the chatty-app/chatty_server/ directory and start the server: `npm start`
5. Open http://localhost:3000 in your browser

## Primary Functionalities

* Any connected user can send a chat message. And all connected users receive the message.
* User can send message with or without name
* User can change their names any time. When use change their names, all connected users receive the notification.
* User can send message with image of URL. And all connected users recevice the message with image.


## devDependencies

* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* node-sass
* react
* react-dom
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-serve

## Dependencies

* Express.js
* [WebSockets](https://github.com/websockets/ws)
* UUID
