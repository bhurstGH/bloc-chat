import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
