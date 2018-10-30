import React, { Component } from 'react';

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageContent: '',
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  handleMessageContent(e) {
    this.setState({ messageContent: e.target.value });
  }

  sendMessage(e) {
    e.preventDefault();
    const userName = this.props.user ? this.props.user.displayName : 'Guest';
    this.messagesRef.push({
      content: this.state.messageContent,
      roomID: this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: userName,
    });
    this.setState({ messageContent: '' });
  }

  submitOnEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.state.messageContent ? this.sendMessage(e) : e.preventDefault();

    }
  }

  render() {
    return (
      <div className="send-message">
        <form id="send-form" onSubmit={e => this.sendMessage(e)}>
          <textarea
            id="send-content" type="text"
            disabled={this.props.activeRoom ? false : true}
            placeholder={this.props.activeRoom ? "Enter to send your message. Shift+Enter for a new line." : "Choose a room to start chatting!"}
            value={this.state.messageContent}
            onChange={e => this.handleMessageContent(e)}
            onKeyDown={e => this.submitOnEnter(e)}
          />
          <input
            id="send-submit" type="submit" value="Send"
            disabled={this.state.messageContent ? false : true}
          />
        </form>
      </div>
    );
  }
}

export default SendMessage;
