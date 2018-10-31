import React from 'react';

const RenameRoom = ({ roomIndex, passRenameIndex }) => {

  return (
      <div className="rename-room" onClick={e => passRenameIndex(e, roomIndex)}>
        R
      </div>
  );
}

export default RenameRoom;
