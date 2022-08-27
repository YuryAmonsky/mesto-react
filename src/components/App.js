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
    isOpen: false, card: {}
  });
  const [selectedCard, setSelectedCard] = React.useState(null);
  /**стейт переменные для изменения текста кнопок форм во время выполнения api-запросов */
  const [buttonEditProfie, setButtonEditProfie] = React.useState({ text: 'Сохранить', disabled: false });
  const [buttonEditAvatar, setButtonEditAvatar] = React.useState({ text: 'Сохранить', disabled: false });
  const [buttonAddPlace, setButtonAddPlace] = React.useState({ text: 'Создать', disabled: true });
  const [buttonDeletePlace, setButtonDeletePlace] = React.useState({ text: 'Да', disabled: false });


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
    document.addEventListener('keydown', handleKeyDown);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    document.addEventListener('keydown', handleKeyDown);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    document.addEventListener('keydown', handleKeyDown);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    document.addEventListener('keydown', handleKeyDown);
  }

  const handleDeleteClick = (card) => {
    setDeletePlaceConfirm({ isOpen: true, card: card });
    document.addEventListener('keydown', handleKeyDown);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletePlaceConfirm({ isOpen: false, card: {} });
    setSelectedCard(null);
    document.removeEventListener('keydown', handleKeyDown);
  }

  /*обработчик закрытия попапа по нажатию на фон*/
  const handlePopupBGClick = (evt) => {
    if (evt.target.classList.contains('popup__container')) {
      closeAllPopups();
    }
  }

  const handleKeyDown = (evt) =>{
    if (evt.keyCode === 27) {
      closeAllPopups();
    }  
  }

  const handleUpdateUser = (objUserInfo) => {
    setButtonEditProfie({ text: 'Сохранение', disabled: true });
    api.setUserInfo(objUserInfo)
      .then(updatedUser => {
        setCurrentUser(updatedUser);        
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка обновления данных пользователя:\n ${err.status}\n ${err.text}`)
      })
      .finally(() => {
        setButtonEditProfie({ text: 'Сохранить', disabled: false });
      });
  }
  const handleUpdateAvatar = (link) => {
    setButtonEditAvatar({ text: 'Загрузка', disabled: true });
    api.setAvatar(link)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка обновления аватара пользователя:\n ${err.status}\n ${err.text}`)
      })
      .finally(() => {
        setButtonEditAvatar({ text: 'Сохранить', disabled: false });
      });
  }

  const handleAddPlace = (objNewCard) => {
    setButtonAddPlace({ text: 'Добавление', disabled: true });
    api.addNewLocation(objNewCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка добавления карточки:\n ${err.status}\n ${err.text}`);
      })
      .finally(() => {
        setButtonAddPlace({ text: 'Создать', disabled: true });
      });
  }

  const handleCardDelete = (card) => {
    setButtonDeletePlace({ text: 'Удаление', disabled: true });
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
      .finally(() => {
        setButtonDeletePlace({ text: 'Да', disabled: false });
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
          onKeyDown={handleKeyDown} onUpdateUser={handleUpdateUser} buttonState={buttonEditProfie} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown} onUpdateAvatar={handleUpdateAvatar} buttonState={buttonEditAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown} onAddPlace={handleAddPlace} buttonState={buttonAddPlace} />
        <DeletePlacePopup isOpen={deletePlaceConfirm.isOpen} onClose={closeAllPopups} onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown} card={deletePlaceConfirm.card} onCardDelete={handleCardDelete} buttonState={buttonDeletePlace} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} onBGClick={handlePopupBGClick} onKeyDown={handleKeyDown}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
