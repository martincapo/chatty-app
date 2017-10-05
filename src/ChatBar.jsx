import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {type: 'postMessage', username: this.props.currentUser, content: ''};
  }

  // When user hit enter
  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      // When text has img link
      if(this._isImageLink(this.state.content)) {
        this._addImageMessage(this.state);
      // Regular text
      } else {
        this.props._addMessage(this.state);
      }
      // Check if username has been changed
      this._userNameChanged(this.state.username);
      this.setState({content: ''});
    }
  }

  // When user change their name, will be notified to every peers.
  _userNameChanged = (username) => {
    if(this.props.currentUser !== username) {
      this.props._addMessage({
        type: "postNotification",
        content: `${this.props.currentUser} has changed their name to ${username}.`
      });
      // change currentUser from app.js
      this.props._setCurrentUser(username);
    }
  }
  // Check if user message has img url
  _isImageLink = (content) => {
    return (content.match(/((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif)$/) !== null);
  }

  // Make a message with text + img
  _addImageMessage = (data) => {
    let parts = data.content.match(/((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif)$/);
    let content = data.content.replace(parts[0], '');
    this.props._addMessage({
        type: "postImage",
        username: data.username,
        content: content,
        imgUrl: parts[0]
      });
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"
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