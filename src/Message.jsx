import React, {Component} from 'react';

class Message extends Component {

  render() {
    console.log("Rendering <Message/>");
    const {type, username, content} = this.props;


    if(type === 'incomingNotification') {
      return (<div className="message system">
                { content }
              </div>
             );
    } else {
      return (
            <div className="message">
              <span className="message-username">{ username }</span>
              <span className="message-content">{ content }</span>
            </div>
          );
    }
  }
}

export default Message;