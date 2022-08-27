import React from 'react';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  /** удаление карточки происходит после подтверждения.
   * добавляю стейт для открытия попапа подтверждения удаления
   * и передачи в него объекта карточки */
  const [deletePlaceConfirm, setDeletePlaceConfirm] = React.useState({
    isOpen:false, card:{}});
  const [selectedCard, setSelectedCard] = React.useState(null);
  /**стейт переменные для изменения текста кнопок форм во время выполнения api-запросов */
  const [buttonTextEditProfie, setButtonTextEditProfie] = React.useState('Сохранить');
  const [buttonTextEditAvatar, setButtonTextEditAvatar] = React.useState('Сохранить');
  const [buttonTextAddPlace, setButtonTextAddPlace] = React.useState('Создать');
  const [buttonTextDeletePlace, setButtonTextDeletePlace] = React.useState('Да');


  React.useEffect(() => {
    Promise.all([      
      api.getUserInfo(),      
      api.loadLocations()
    ])
      .then((values) => {
        setCurrentUser(values[0]);
        setCards([...values[1]]);
      }).catch(err => {
        console.log(err.status);
        alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.text}`);
      });
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleDeleteClick = (card) => {     
    setDeletePlaceConfirm({isOpen:true, card:card});
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletePlaceConfirm({isOpen:false, card:{}});
    setSelectedCard(null);
  }

  /*обработчик закрытия попапа по нажатию на фон*/
  const handlePopupBGClick = (evt)=>{  
    if(evt.target.classList.contains('popup__container')){
      closeAllPopups();
    }
  }

  const handleUpdateUser = (objUserInfo) => {
    setButtonTextEditProfie('Сохранение');
    api.setUserInfo(objUserInfo)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка обновления данных пользователя:\n ${err.status}\n ${err.text}`)
      })
      .finally(()=>{
        setButtonTextEditProfie('Сохранить');
      });
  }
  const handleUpdateAvatar = (link) => {
    setButtonTextEditAvatar('Загрузка');
    api.setAvatar(link)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка обновления аватара пользователя:\n ${err.status}\n ${err.text}`)
      })
      .finally(()=>{
        setButtonTextEditAvatar('Сохранить');
      });
  }

  const handleAddPlace = (objNewCard) => {
    setButtonTextAddPlace('Добавление');
    api.addNewLocation(objNewCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка добавления карточки:\n ${err.status}\n ${err.text}`);
      })
      .finally(()=>{
        setButtonTextAddPlace('Создать');
      });
  }

  const handleCardDelete = (card) => {
    setButtonTextDeletePlace('Удаление');
    api.deleteLocation(card._id)
      .then(res => {
        console.log(res);
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка удаления карточки:\n ${err.status}\n ${err.text}`);
      })
      .finally(()=>{
        setButtonTextDeletePlace('Да');
      });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));        
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка загрузки данных карточки:\n ${err.status}\n ${err.text}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onNewLocation={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onDeleteClick={handleDeleteClick}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onBGClick={handlePopupBGClick} 
          onUpdateUser={handleUpdateUser} buttonText={buttonTextEditProfie}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onBGClick={handlePopupBGClick} 
          onUpdateAvatar={handleUpdateAvatar} buttonText={buttonTextEditAvatar}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onBGClick={handlePopupBGClick} 
          onAddPlace={handleAddPlace} buttonText={buttonTextAddPlace}/>        
        <DeletePlacePopup isOpen={deletePlaceConfirm.isOpen} onClose={closeAllPopups} onBGClick={handlePopupBGClick}
          card={deletePlaceConfirm.card} onCardDelete={handleCardDelete} buttonText={buttonTextDeletePlace}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} onBGClick={handlePopupBGClick}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
