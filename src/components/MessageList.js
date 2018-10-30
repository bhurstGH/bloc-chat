import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.getMessages();
    this.scrollToLast();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeRoom !== prevProps.activeRoom) {
      this.clearMessages();
      this.getMessages();
    }
    this.scrollToLast();
  }

  getMessages() {
    this.messagesRef.orderByChild('roomID').equalTo(this.props.activeRoom).on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  clearMessages() {
    this.messagesRef.orderByChild('roomID').equalTo(this.props.activeRoom).off('child_added');
    this.setState({ messages: [] })
  }

scrollToLast() {
  this.last.scrollIntoView();
}

  localTimeStamp(time) {
    let timestamp = new Date(time);
    let hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    let ampm = hours > 11 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let datestamp = `${timestamp.getMonth()}/${timestamp.getDate()}/${timestamp.getFullYear()}`;
    return `${hours}:${minutes}${ampm} ${datestamp}`;
  }

  render() {
    return (
      <div className="message-list">
        {this.state.messages.map( message =>
          <div className="message-item" key={message.key}>
            <span className="message-username">{message.username + ": "}</span>
            <p className="message-content">
              {message.content}
            </p>
            <span className="message-sentAt">{"(" + this.localTimeStamp(message.sentAt) + ")"}</span>
          </div>
        )}
        <div ref={last => { this.last = last; }} />
      </div>
    );
  }
}
export default MessageList;
