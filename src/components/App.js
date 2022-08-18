import React from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  
  const handleEditProfileClick = ()=>{
    setEditProfilePopupState(true);
  }

  const handleEditAvatarClick = ()=>{
    setEditAvatarPopupState(true);
  }

  const handleAddPlaceClick = ()=>{
    setAddPlacePopupState(true);
  }
  
  const handleCardClick  = (card) =>{
    setSelectedCard(card);
  }

  const closeAllPopups = ()=>{
    setEditProfilePopupState(false);
    setEditAvatarPopupState(false);
    setAddPlacePopupState(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile = {handleEditProfileClick} 
        onEditAvatar = {handleEditAvatarClick} 
        onNewLocation = {handleAddPlaceClick} 
        onCardClick = {handleCardClick} 
      />
      <Footer />
      <PopupWithForm 
        title="Редактировать профиль" 
        name="edit-profile"
        isOpen = {isEditProfilePopupOpen} 
        onClose = {closeAllPopups} 
        children={<>
        <input className="dialog-form__input dialog-form__input_type_edit-profile-name" name="inputEditProfileName"
          id="input-edit-profile-name" type="text" placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="dialog-form__input-error input-edit-profile-name-error"></span>
        <input className="dialog-form__input dialog-form__input_type_edit-profile-about-me" name="inputEditProfileAboutMe"
          id="input-edit-profile-about-me" type="text" placeholder="О себе" minLength="2" maxLength="200" required />
        <span className="dialog-form__input-error input-edit-profile-about-me-error"></span>
        <button className="dialog-form__submit-button" type="submit" name="submitEditProfile"
          formMethod="post">Сохранить</button></>
      }/>
      <PopupWithForm 
        title="Обновить аватар" 
        name="edit-avatar" 
        isOpen = {isEditAvatarPopupOpen} 
        onClose = {closeAllPopups} 
        children={<>
        <input className="dialog-form__input dialog-form__input_type_edit-avatar" name="inputEditAvatar"
          id="input-edit-avatar" type="url" placeholder="Ссылка на картинку" required />
        <span className="dialog-form__input-error input-edit-avatar-error"></span>        
        <button className="dialog-form__submit-button" type="submit" name="submitEditAvatar"
          formMethod="post">Сохранить</button></>
      }/>
      <PopupWithForm 
        title="Новое место" 
        name="new-location" 
        isOpen = {isAddPlacePopupOpen} 
        onClose = {closeAllPopups} 
        children={<>
        <input className="dialog-form__input dialog-form__input_type_new-location-name" name="inputNewLocationName"
          id="input-new-location-name" type="text" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="dialog-form__input-error input-new-location-name-error"></span>
        <input className="dialog-form__input dialog-form__input_type_new-location-link" name="inputNewLocationLink"
          id="input-new-location-link" type="url" placeholder="Ссылка на картинку" required />
        <span className="dialog-form__input-error input-new-location-link-error"></span>
        <button className="dialog-form__submit-button" type="submit" name="submitNewLocation"
          formMethod="post">Создать</button></>
      }/>
      <PopupWithForm 
        title="Вы уверены?" 
        name="delete-location" 
        children={<>
        <button className="dialog-form__submit-button" type="submit" name="submitDeleteLocation">Да</button></>
      }/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />  
    </div>
  );
}

export default App;
