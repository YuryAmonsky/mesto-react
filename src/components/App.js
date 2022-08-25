import React from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    "name":'',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  
  React.useEffect(()=>{
    api.getUserInfo()
      .then(res=>{
        setCurrentUser(res)
      }).catch(err=>{
        console.log(err.status);
        alert(`Ошибка загрузки данных пользователя:\n ${err.status}\n ${err.text}`);
      });
    
  },[]);

  const handleEditProfileClick = ()=>{
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = ()=>{
    setIsEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = ()=>{
    setIsAddPlacePopupOpen(true);
  }
  
  const handleCardClick  = (card) =>{
    setSelectedCard(card);
  }

  const handleUpdateUser = (objUserInfo)=>{
    api.setUserInfo(objUserInfo)
    .then(updatedUser=>{
      setCurrentUser(updatedUser);
      closeAllPopups();
    })
    .catch(err=>{
      console.log(err.status);
      alert(`Ошибка обновления данных пользователя:\n ${err.status}\n ${err.text}`)
    });
  }

  const closeAllPopups = ()=>{
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          onEditProfile = {handleEditProfileClick} 
          onEditAvatar = {handleEditAvatarClick} 
          onNewLocation = {handleAddPlaceClick} 
          onCardClick = {handleCardClick} 
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupWithForm 
          title="Обновить аватар" 
          name="edit-avatar" 
          isOpen = {isEditAvatarPopupOpen} 
          onClose = {closeAllPopups}
          buttonText = "Сохранить"
        >         
          <input className="dialog-form__input dialog-form__input_type_edit-avatar" name="inputEditAvatar"
            id="input-edit-avatar" type="url" placeholder="Ссылка на картинку" required />
          <span className="dialog-form__input-error input-edit-avatar-error"></span>                  
        </PopupWithForm>
        <PopupWithForm 
          title="Новое место" 
          name="new-location" 
          isOpen = {isAddPlacePopupOpen} 
          onClose = {closeAllPopups} 
          buttonText = "Создать"
        >
          <input className="dialog-form__input dialog-form__input_type_new-location-name" name="inputNewLocationName"
            id="input-new-location-name" type="text" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="dialog-form__input-error input-new-location-name-error"></span>
          <input className="dialog-form__input dialog-form__input_type_new-location-link" name="inputNewLocationLink"
            id="input-new-location-link" type="url" placeholder="Ссылка на картинку" required />
          <span className="dialog-form__input-error input-new-location-link-error"></span>          
        </PopupWithForm>
        <PopupWithForm 
          title="Вы уверены?" 
          name="delete-location" 
          buttonText = "Да"
        />        
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />  
      </div>
    </CurrentUserContext.Provider>    
  );
}

export default App;
