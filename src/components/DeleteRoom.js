import React from 'react';

const DeleteRoom = ({ roomIndex, rooms, handleDeleteRoom }) => {

  return (
    <div className="delete-room" onClick={(e) => handleDeleteRoom(e, rooms, roomIndex )}>
      D
    </div>
  );
}

export default DeleteRoom;
