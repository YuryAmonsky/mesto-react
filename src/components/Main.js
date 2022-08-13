import React from 'react';

function Main(){
  const handleEditAvatarClick = ()=>{
    const elementPopupvEditAvatar = document.querySelector('.popup_type_edit-avatar');
    elementPopupvEditAvatar.classList.add('popup_opened');
  }
  
  const handleEditProfileClick = ()=>{
    const elementPopupvEditProfile = document.querySelector('.popup_type_edit-profile');
    elementPopupvEditProfile.classList.add('popup_opened');
  }

  const handleAddPlaceClick = ()=>{
    const elementPopupvNewLocation = document.querySelector('.popup_type_new-location');
    elementPopupvNewLocation.classList.add('popup_opened');
  }

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={handleEditAvatarClick}>
          <img className="profile__avatar" src="#" alt="аватар" />
        </div>  
        <div className="profile__info">
          <h1 className="profile__name"></h1>
          <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
          <p className="profile__about-me"></p>
        </div>
        <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
      </section>
      <section aria-label="locations">
        <ul className="location-list">
        </ul>
      </section>
    </main>
  );
}  

export default Main;