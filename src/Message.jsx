import React, {Component} from 'react';

class Message extends Component {

  render() {
    console.log("Rendering <Message/>");
    const { type, fontColor, username, imgUrl ,content } = this.props;

    let color = {color: fontColor};

    // Notification when user change their name
    if(type === 'incomingNotification') {
      return (<div className="message system">
                { content }
              </div>
             );
    // Display text and img
    } else if (type === 'incomingImage') {
      return (<div className="message">
                <span className="message-username" style={ color }>{ username }</span>
                <span className="message-content">
                  <p> { content } </p>
                  <img className="img" src={ imgUrl} />
                </span>
              </div>
            );
    // Display message
    } else {
      return (
            <div className="message">
              <span className="message-username" style={ color }>{ username }</span>
              <span className="message-content">{ content }</span>
            </div>
          );
    }
  }
}

export default Message;