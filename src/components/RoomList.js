import React, { Component } from 'react';
import CreateRoom from './CreateRoom';
import DeleteRoom from './DeleteRoom';
import RenameRoom from './RenameRoom';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      showCreate: false,
      showRename: {
        show: false,
        index: null
      },
      newRoom: '',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.messagesRef = this.props.firebase.database().ref('messages');
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
    } else {
    this.setState({ showCreate: true });
    }
  }
  renameRoom = (e, rooms, i) => {
    if (this.state.newRoom) {
      e.preventDefault();
      const newRooms = rooms.map(room => {
        if (room.name === rooms[i].name) {
          room.name = this.state.newRoom;
        }
        return room;
      });
      this.roomsRef.child(rooms[i].key).transaction(name => {
        return { name: this.state.newRoom }
      });
      this.setState({ rooms: newRooms })
      this.cancelRoom();
    }
  }
  passRenameIndex = (e, i) => {
    e.stopPropagation();
    if (this.props.user) {
      this.setState({ showRename: { show: true, index: i } });
    } else {
      alert('Login to rename rooms.');
    }
  }
  cancelRoom() {
    this.setState({ showCreate: false, showRename: { show: false, index: null }, newRoom: '' });
  }

  handleRoomInput(e) {
    this.setState({ newRoom: e.target.value });
  }

  handleDeleteRoom = (e, rooms, i) => {
    e.stopPropagation();
    if (this.props.user) {
      const roomMessages = this.messagesRef.orderByChild('roomID').equalTo(rooms[i].key)
      roomMessages.once('value').then( snapshot => {
        snapshot.forEach(childsnap => {
          this.messagesRef.child(childsnap.key).remove();
        });
      });
      this.roomsRef.child(rooms[i].key).remove();
      const newRooms = this.props.deleteItem(rooms, i);
      this.setState({ rooms: newRooms });
      this.props.handleActiveRoom(null);
    } else {
      alert('Login to delete rooms');
    }
  }

  render() {
    return (
      <div className="room-list">
        <div className="room-header">
          <h1>FBR Chat</h1>
          <button className="create-room-button" type="button" onClick={() => this.createRoom()}>Create a room</button>
        </div>
        <CreateRoom
          show={this.state.showCreate}
          cancelRoom={() => this.cancelRoom()}>
          <form className='create-room-form' onSubmit={(e) => this.createRoom(e, this.state.newRoom)}>
            <input type="text" value={this.state.newRoom} placeholder="Enter new room name" onChange={e => this.handleRoomInput(e)}/>
            <input type="submit" value="Create room"/>
          </form>
        </CreateRoom>
        {this.state.rooms.map( (room, i) =>
          <div className={(this.props.activeRoom === room.key) ? "active-room room-row" : "room-row"} key={room.key} onClick={() => this.props.handleActiveRoom(room.key)}>
            {room.name}
            <DeleteRoom
              roomIndex={i}
              rooms={this.state.rooms}
              handleDeleteRoom={this.handleDeleteRoom}
            />
            <RenameRoom
              roomIndex={i}
              passRenameIndex={this.passRenameIndex}
            />
          </div>
        )}
        <CreateRoom
          show={this.state.showRename.show}
          cancelRoom={() => this.cancelRoom()}>
          <form className='create-room-form' onSubmit={e => this.renameRoom(e, this.state.rooms, this.state.showRename.index)}>
            <input type="text" value={this.state.newRoom} placeholder="Enter new room name" onChange={e => this.handleRoomInput(e)}/>
            <input type="submit" value="Rename room"/>
          </form>
        </CreateRoom>
      </div>
    );
  }
}

export default RoomList;
