import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }


  componentDidMount() {

    this.appSocket = new WebSocket("ws://localhost:3001");

    // this.appSocket.onopen = (event) => {
    //   this.appSocket.send("Client connected");
    // };

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  _addMessage = (msg) => {
    console.log("My msg is: ", msg);
    // Send the msg object as a JSON-formatted string.

    const newMessage = {id: 4, username: this.state.currentUser.name, content: msg.value};
    const messages = this.state.messages.concat(newMessage)

    this.appSocket.send(JSON.stringify(newMessage));
    // this.appSocket.onmessage = (event) => {
    //   var tesitng = JSON.parse(event.data);

    //   console.log(tesitng);
    // }


    this.setState({messages: messages});
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} _addMessage={this._addMessage} />
      </div>
    );
  }

}


export default App;
