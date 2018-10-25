import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeRoom !== prevProps.activeRoom) {
      this.clearMessages();
      this.getMessages();
    }
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

  render() {
    return (
      <div className="message-list">
        {this.state.messages.map( message =>
          <div className="message-item" key={message.key}>
            {message.username + ": " + message.content + "(" + message.sentAt + ")"}
          </div>
        )}
      </div>
    );
  }
}
export default MessageList;
