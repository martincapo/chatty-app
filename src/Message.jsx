import React, {Component} from 'react';

class Message extends Component {

  render() {
    console.log("Rendering <Message/>");
    const {type, fontColor, username, content} = this.props;

    let color = {color: fontColor};


    if(type === 'incomingNotification') {
      return (<div className="message system">
                { content }
              </div>
             );
    } else {
      return (
            <div className="message">
              <span className="message-username" style={color}>{ username }</span>
              <span className="message-content">{ content }</span>
            </div>
          );
    }
  }
}

export default Message;