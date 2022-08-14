import React from 'react';
import {api} from '../utils/Api';

function Main(props){

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  //const [userInfo, setUserInfoObj] = React.useState('');
  React.useEffect(()=>{
    api.getUserInfo()
      .then(res=>{
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
  },[userName,userDescription,userAvatar]);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="аватар" />
        </div>  
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__about-me">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onNewLocation}></button>
      </section>
      <section aria-label="locations">
        <ul className="location-list">
        </ul>
      </section>
    </main>
  );
}  

export default Main;