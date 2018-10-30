import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import SendMessage from './components/SendMessage';
import UserList from './components/UserList';

var config = {
  apiKey: "AIzaSyBA3YCQPOtaRz_lsapQWredZ7yLKMWzV3w",
  authDomain: "bloc-chat-6ca07.firebaseapp.com",
  databaseURL: "https://bloc-chat-6ca07.firebaseio.com",
  projectId: "bloc-chat-6ca07",
  storageBucket: "bloc-chat-6ca07.appspot.com",
  messagingSenderId: "683680884029"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
      user: null
    };
  }

  handleActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <RoomList
          firebase={firebase}
          handleActiveRoom={(room) => this.handleActiveRoom(room)}
          activeRoom={this.state.activeRoom}
        />
        <div id="messages">
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            user={this.state.user}
         />
         <SendMessage
           firebase={firebase}
           activeRoom={this.state.activeRoom}
           user={this.state.user}
         />
       </div>
       <UserList
         firebase={firebase}
         setUser={(user) => this.setUser(user)}
         user={this.state.user}
       />
      </div>
    );
  }
}

export default App;
