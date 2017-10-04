import React, {Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component {

  render() {
    console.log("Rendering <MessageList/>");
    return (
      <div>
        { this.props.messages.map( (message,index) => {
          return <Message
                    key={ index }
                    username={ message.username }
                    content={ message.content }
                  />
          })
        }
      </div>
    );
  }
}

export default MessageList;