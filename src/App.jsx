import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userCounts: 0,
      fontColor: "#000",
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] // messages coming from the server will be stored here as they arrive
    }
  }


  componentDidMount() {

    console.log("componentDidMount <App />");

    this.appSocket = new WebSocket("ws://localhost:3001");

    this.appSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);

      if (newMessage.type === 'userCountChanged') {
        this.setState({userCounts: newMessage.userCount});
      } else if(newMessage.type === 'fontColor') {
        this.setState({fontColor: newMessage.fontColor});
      } else {
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages});
      }
    }
  }

  // Send the msg object as a JSON-formatted string.
  _addMessage = (msg) => {
    console.log('Sending to server: ', msg);
    msg['fontColor'] = this.state.fontColor;
    this.appSocket.send(JSON.stringify(msg));
  }

  _setCurrentUser = (user) => {
    this.setState({currentUser: {name: user}});
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="navbar-users">{this.state.userCounts} users online</p>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} _addMessage={this._addMessage}
                _setCurrentUser={this._setCurrentUser}
        />
      </div>
    );
  }
}


export default App;
