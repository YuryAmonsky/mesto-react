import React from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import Footer from './Footer';

function App() {
 
  
  

  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
  const [isNewLocationPopupOpen, setNewLocationPopupState] = React.useState(false);
  
  const handleEditProfileClick = ()=>{
    setEditProfilePopupState(true);
  }

  const handleEditAvatarClick = ()=>{
    setEditAvatarPopupState(true);
  }

  const handleNewLocationClick = ()=>{
    setNewLocationPopupState(true);
  }
  

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile = {handleEditProfileClick} 
        onEditAvatar = {handleEditAvatarClick} 
        onNewLocation = {handleNewLocationClick} 
      />
      <Footer />
      <PopupWithForm 
        title="Редактировать профиль" 
        name="edit-profile"
        isOpen = {isEditProfilePopupOpen} 
        children={<>
        <input className="dialog-form__input dialog-form__input_type_edit-profile-name" name="inputEditProfileName"
          id="input-edit-profile-name" type="text" placeholder="Имя" minlength="2" maxlength="40" required />
        <span className="dialog-form__input-error input-edit-profile-name-error"></span>
        <input className="dialog-form__input dialog-form__input_type_edit-profile-about-me" name="inputEditProfileAboutMe"
          id="input-edit-profile-about-me" type="text" placeholder="О себе" minlength="2" maxlength="200" required />
        <span className="dialog-form__input-error input-edit-profile-about-me-error"></span>
        <button className="dialog-form__submit-button" type="submit" name="submitEditProfile"
          formmethod="post">Сохранить</button></>
      }/>
      <PopupWithForm 
        title="Обновить аватар" 
        name="edit-avatar" 
        isOpen = {isEditAvatarPopupOpen} 
        children={<>
        <input className="dialog-form__input dialog-form__input_type_edit-avatar" name="inputEditAvatar"
          id="input-edit-avatar" type="url" placeholder="Ссылка на картинку" required />
        <span className="dialog-form__input-error input-edit-avatar-error"></span>        
        <button className="dialog-form__submit-button" type="submit" name="submitEditAvatar"
          formmethod="post">Сохранить</button></>
      }/>
      <PopupWithForm 
        title="Новое место" 
        name="new-location" 
        isOpen = {isNewLocationPopupOpen} 
        children={<>
        <input className="dialog-form__input dialog-form__input_type_new-location-name" name="inputNewLocationName"
          id="input-new-location-name" type="text" placeholder="Название" minlength="2" maxlength="30" required />
        <span className="dialog-form__input-error input-new-location-name-error"></span>
        <input className="dialog-form__input dialog-form__input_type_new-location-link" name="inputNewLocationLink"
          id="input-new-location-link" type="url" placeholder="Ссылка на картинку" required />
        <span className="dialog-form__input-error input-new-location-link-error"></span>
        <button className="dialog-form__submit-button" type="submit" name="submitNewLocation"
          formmethod="post">Создать</button></>
      }/>
      <PopupWithForm 
        title="Вы уверены?" 
        name="delete-location" 
        children={<>
        <button className="dialog-form__submit-button" type="submit" name="submitDeleteLocation">Да</button></>
      }/>
      <PopupWithImage />
  {/*}    <div className="popup popup_type_edit-profile">
        <div className="popup__container">
          <button className="popup__close-icon" type="button"></button>
          <form className="dialog-form dialog-form_type_edit-profile" name="formEditProfile" novalidate>
            <h2 className="dialog-form__title dialog-form__title_type_edit-profile">Редактировать профиль</h2>
            <input className="dialog-form__input dialog-form__input_type_edit-profile-name" name="inputEditProfileName"
              id="input-edit-profile-name" type="text" placeholder="Имя" minlength="2" maxlength="40" required />
            <span className="dialog-form__input-error input-edit-profile-name-error"></span>
            <input className="dialog-form__input dialog-form__input_type_edit-profile-about-me" name="inputEditProfileAboutMe"
              id="input-edit-profile-about-me" type="text" placeholder="О себе" minlength="2" maxlength="200" required />
            <span className="dialog-form__input-error input-edit-profile-about-me-error"></span>
            <button className="dialog-form__submit-button" type="submit" name="submitEditProfile"
            formmethod="post">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_edit-avatar">
        <div className="popup__container">
          <button className="popup__close-icon" type="button"></button>
          <form className="dialog-form dialog-form_type_edit-avatar" name="formEditAvatar" novalidate>
            <h2 className="dialog-form__title dialog-form__title_type_edit-avatar">Обновить аватар</h2>
            <input className="dialog-form__input dialog-form__input_type_edit-avatar" name="inputEditAvatar"
              id="input-edit-avatar" type="url" placeholder="Ссылка на картинку" required />
            <span className="dialog-form__input-error input-edit-avatar-error"></span>        
            <button className="dialog-form__submit-button" type="submit" name="submitEditAvatar"
              formmethod="post">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_new-location">
        <div className="popup__container">
          <button className="popup__close-icon" type="button"></button>
          <form className="dialog-form dialog-form_type_new-location" name="formNewLocation" novalidate>
            <h2 className="dialog-form__title dialog-form__title_type_new-location">Новое место</h2>
            <input className="dialog-form__input dialog-form__input_type_new-location-name" name="inputNewLocationName"
              id="input-new-location-name" type="text" placeholder="Название" minlength="2" maxlength="30" required />
            <span className="dialog-form__input-error input-new-location-name-error"></span>
            <input className="dialog-form__input dialog-form__input_type_new-location-link" name="inputNewLocationLink"
              id="input-new-location-link" type="url" placeholder="Ссылка на картинку" required />
            <span className="dialog-form__input-error input-new-location-link-error"></span>
            <button className="dialog-form__submit-button" type="submit" name="submitNewLocation"
              formmethod="post">Создать</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_delete-location">
        <div className="popup__container">
          <button className="popup__close-icon" type="button"></button>
          <form className="dialog-form dialog-form_type_delete-location" name="formDeleteLocation" novalidate>
            <h2 className="dialog-form__title dialog-form__title_type_delete-location">Вы уверены?</h2>
            <button className="dialog-form__submit-button" type="submit" name="submitDeleteLocation">Да</button>
          </form>
        </div>
      </div>
  {*/}
      <template className="location-template">
        <li className="location">
          <button className="location__delete-icon" type="button"></button>
          <img className="location__image" src="#" alt="Фотография места" />
          <h2 className="location__name"></h2>
          <div className="location__like-group">
            <button className="location__like" type="button"></button>
            <span className="location__likes-number"></span>
          </div>      
        </li>
      </template>
    </div>
  );
}

export default App;
