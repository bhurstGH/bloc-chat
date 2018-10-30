import React from 'react';

const CreateRoom = ({ show, cancelRoom, children }) => {

  const displayClass = show ? "do-display" : "do-not-display";
  return (
    <div className={displayClass} onClick={cancelRoom}>
      <section className="create-room-modal" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={cancelRoom}>Cancel room creation</button>
      </section>
    </div>
  );
}

export default CreateRoom;
