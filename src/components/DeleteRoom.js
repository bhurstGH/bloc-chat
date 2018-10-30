import React from 'react';

const DeleteRoom = ({ firebase, room, deleteRoom }) => {

  const roomsRef = firebase.database().ref('rooms');
  const messagesRef = firebase.database().ref('messages');


  return (
    <div className="delete-room" onClick={(e) => deleteRoom(e, room, roomsRef)}>
      D
    </div>
  );
}

export default DeleteRoom;
