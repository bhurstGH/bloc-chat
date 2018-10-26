import React from 'react';

const User = props => {

  const userName = props.user ? props.user.displayName : 'Guest';
  const profilePic = props.user ? <img src={props.user.photoURL} alt='Profile'/> : '';

  return (
    <div className='user'>
      {userName}
      {profilePic}
      <button className="user-button" onClick={() => props.signInOut()}>{(props.user) ? 'Sign Out' : 'Sign In'}</button>
    </div>
  );
}

export default User;
