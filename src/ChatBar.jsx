import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {type: 'postMessage', username: this.props.currentUser, content: ''};
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      console.log('My state is: ', this.state);
      this.props._addMessage(this.state);
      this._clientNameChanged(this.state.username);
      this.setState({content: ''});
    }
  }

  _clientNameChanged = (username) => {
    if(this.props.currentUser !== username) {
      this.props._addMessage({
        type: "postNotification",
        content: `${this.props.currentUser} has changed their name to ${username}.`
      });
      this.props._setCurrentUser(username);
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser}
          onKeyPress={(e) => this.handleKeyPress(e)}
          onChange={(e) => this.setState({username: e.target.value }) }
        />

        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          onKeyPress={(e) => this.handleKeyPress(e)}
          value={this.state.content}
          onChange={e => this.setState({content: e.target.value })}
        />
      </footer>
    );
  }
}


export default ChatBar;