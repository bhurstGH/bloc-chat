import React, { Component } from 'react';
import CreateRoom from './CreateRoom';

class RoomList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      showCreate: false,
      newRoom: '',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom(e, newRoom) {
    if (newRoom) {
      e.preventDefault();
      this.roomsRef.push({
        name: newRoom
      });
      this.cancelRoom();
      this.setState({ newRoom: '' });
    } else {
    this.setState({ showCreate: true });
    }
  }

  cancelRoom() {
    this.setState({ showCreate: false });
  }

  handleRoomInput(e) {
    this.setState({ newRoom: e.target.value });
  }

  render() {
    return (
      <div className="room-list">
        <h1>Bloc Chat</h1>
        <CreateRoom
          show={this.state.showCreate}
          cancelRoom={() => this.cancelRoom()}>
          <form onSubmit={(e) => this.createRoom(e, this.state.newRoom)}>
            <label>
              New room:
              <input type="text" value={this.state.newRoom} onChange={e => this.handleRoomInput(e)}/>
            </label>
              <input type="submit" value="Create room"/>
          </form>
        </CreateRoom>
        <button className="create-room-button" type="button" onClick={() => this.createRoom()}>Create a room</button>
        <ul>
          {this.state.rooms.map( room =>
            <li className='room-row' key={room.key}>
              {room.name}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default RoomList;
