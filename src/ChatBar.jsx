import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {type: 'postMessage', username: this.props.currentUser, content: ''};
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      console.log('My state is: ', this.state);
      if(this._isImageLink(this.state.content)) {
        this._addImageMessage(this.state);
      } else {
        this.props._addMessage(this.state);
      }
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
      // change currentUser from app.js
      this.props._setCurrentUser(username);
    }
  }

  _isImageLink = (content) => {
    let parts = content.split('.');
    let imgFileType = parts.pop().toLowerCase();

    if(imgFileType === 'jpg' || imgFileType === 'png' || imgFileType === 'gif') {
      return true;
    } else {
      return false;
    }
  }

  _addImageMessage = (data) => {
    this.props._addMessage({
        type: "postImage",
        username: data.username,
        content: data.content
      });
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