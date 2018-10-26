import React, { Component } from 'react';
import User from './User';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.provider = new props.firebase.auth.GoogleAuthProvider();

  };

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signInOut() {
    if (!this.props.user) {
      return this.props.firebase.auth().signInWithPopup(this.provider);
    } else {
      return this.props.firebase.auth().signOut();
    }
  }

  render() {
    return (
      <div className="user-list">
        <div className="user-header">
          <User
            firebase={this.props.firebase}
            user={this.props.user}
            signInOut={() => this.signInOut()}
          />
        </div>
      </div>
    );
  }
}

export default UserList;
