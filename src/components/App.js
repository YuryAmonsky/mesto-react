import { useState, useEffect, useCallback } from 'react';
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
  const [currentUser, setCurrentUser] = useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  /** состояние для попапа подтверждения удаления карточки */
  const [deletePlaceConfirm, setDeletePlaceConfirm] = useState({
    isOpen: false, card: {}
  });
  const [selectedCard, setSelectedCard] = useState(null);

  /**стейт кнопок сабмита форм
   *  Активность кнопки изменяется при выполнении запросов к серверу и валидации форм.
   * Текст неактивной кнопки разный при выполнении запроса и валидации, 
   * поэтому добавляю в стейт текст отдельным полем.
  const [buttonEditProfile, setButtonEditProfile] = useState({ text: 'Сохранить', disabled: false });
  const [buttonEditAvatar, setButtonEditAvatar] = useState({ text: 'Сохранить', disabled: true });
  const [buttonAddPlace, setButtonAddPlace] = useState({ text: 'Создать', disabled: true });
  const [buttonDeletePlace, setButtonDeletePlace] = useState({ text: 'Да', disabled: false });*/
  const [submitButtonState, setSsubmitButtonState] = useState({ text: '', disabled: false });
  //const [isSubmiButtonDisabled, setIsSubmiButtonDisabled] = useState(true);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setSsubmitButtonState({ text: 'Сохранение', disabled: false });
    //setIsSubmiButtonDisabled(false);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setSsubmitButtonState({ text: 'Сохранение', disabled: true });
    //setIsSubmiButtonDisabled(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setSsubmitButtonState({ text: 'Создать', disabled: true });
    //setIsSubmiButtonDisabled(true);
  }

  const handleDeleteClick = (card) => {
    setDeletePlaceConfirm({ isOpen: true, card: card });
    setSsubmitButtonState({ text: 'Да', disabled: false });
    //setIsSubmiButtonDisabled(false);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = (formName) => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletePlaceConfirm({ isOpen: false, card: {} });    
    setSelectedCard(null);    
    /*
    setButtonEditProfile({ text: 'Сохранить', disabled: false });
    setButtonEditAvatar({ text: 'Сохранить', disabled: true });
    setButtonAddPlace({ text: 'Создать', disabled: true });*/
    /*
    switch(formName){
      case 'edit-profile':
        //setSsubmitButtonState({text: 'Сохранить', disabled: false});
        setIsSubmiButtondisabled(false);
        break;
      case 'edit-avatar':
        //setSsubmitButtonState({text: 'Сохранить', disabled: true});
        setIsSubmiButtondisabled(true);
        break;
      case 'new-location':
        setSsubmitButtonState({text: 'Создать', disabled: true});
        setIsSubmiButtondisabled(true);
        break;
      default:
        break;
    }*/
  }

  /*обработчик закрытия попапа по нажатию на фон*/
  const handlePopupBGClick = (evt) => {
    if (evt.target.classList.contains('popup__container')) {
      closeAllPopups();
    }
  }
  /*обработчик закрытия попапа по нажатию Esc*/
  const handleKeyDown = useCallback((evt) => {
    if (evt.keyCode === 27) {
      closeAllPopups();
    }
  },[]);

  const handleUpdateUser = (objUserInfo) => {
    //setButtonEditProfile({ text: 'Сохранение', disabled: true });
    setSsubmitButtonState({ text: 'Сохранение', disabled: true });
    //setIsSubmiButtonDisabled(true);
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
        //setButtonEditProfile({ text: 'Сохранить', disabled: false });
        setSsubmitButtonState({ text: 'Сохранить', disabled: false });
        //setIsSubmiButtonDisabled(false);
      });
  }
  const handleUpdateAvatar = (link) => {
    //setButtonEditAvatar({ text: 'Загрузка', disabled: true });
    setSsubmitButtonState({ text: 'Загрузка', disabled: true });
    //setIsSubmiButtonDisabled(true);
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
        //setButtonEditAvatar({ text: 'Сохранить', disabled: false });
        setSsubmitButtonState({ text: 'Сохранить', disabled: false });
        //setIsSubmiButtonDisabled(false);
      });
  }

  const handleAddPlace = (objNewCard) => {
    //setButtonAddPlace({ text: 'Добавление', disabled: true });
    setSsubmitButtonState({ text: 'Добавление', disabled: true });
    //setIsSubmiButtonDisabled(true);
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
        //setButtonAddPlace({ text: 'Создать', disabled: false });
        setSsubmitButtonState({ text: 'Создать', disabled: false });
        //setIsSubmiButtonDisabled(false);
      });
  }

  const handleCardDelete = (card) => {
    //setButtonDeletePlace({ text: 'Удаление', disabled: true });
    setSsubmitButtonState({ text: 'Удаление', disabled: true });
    //setIsSubmiButtonDisabled(true);
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
        //setButtonDeletePlace({ text: 'Да', disabled: false });
        setSsubmitButtonState({ text: 'Да', disabled: false });
        //setIsSubmiButtonDisabled(false);
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
/*
  const handleEditProfileValidate = useCallback((isValid) => {
    setButtonEditProfile({ disabled: !isValid, text: "Сохранить" });
  }, []);

  const handleEditAvatarValidate = useCallback((isValid) => {
    setButtonEditAvatar({ disabled: !isValid, text: "Сохранить" });
  }, []);

  const handleAddPlaceValidate = useCallback((isValid) => {
    setButtonAddPlace({ disabled: !isValid, text: "Создать" });
  }, []);
  
  const handleFormValidate = useCallback((isValid) => {
    setIs({ disabled: !isValid, text: "Сохранить" });
  }, []);
*/
  const handleFormValidate = useCallback((isValid, formName)=>{
    
    switch(formName){
      case 'edit-profile':
        setSsubmitButtonState({disabled: !isValid, text:'Сохранить'});
        break;
      case 'edit-avatar':
        setSsubmitButtonState({disabled: !isValid, text:'Сохранить'});
        break;
      case 'new-location':
        setSsubmitButtonState({disabled: !isValid, text:'Создать'});
        break;
      default:

        break;
    }
    //setIsSubmiButtonDisabled(!isValid);
    //setSsubmitButtonState({disabled: !isValid, ...submitButtonState});
  }, []); 
  
  useEffect(() => {
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

  useEffect(()=>{
    if(isEditAvatarPopupOpen||isEditProfilePopupOpen||isAddPlacePopupOpen||deletePlaceConfirm.isOpen|| selectedCard){
      document.addEventListener('keydown', handleKeyDown);
    }else{
      document.removeEventListener('keydown', handleKeyDown);
    }    
  },[isEditAvatarPopupOpen,isEditProfilePopupOpen,isAddPlacePopupOpen, deletePlaceConfirm.isOpen, selectedCard, handleKeyDown]);
  
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
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
          onUpdateUser={handleUpdateUser}
          onFormValidate={handleFormValidate}
          buttonState={submitButtonState}         
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
          onUpdateAvatar={handleUpdateAvatar}
          onFormValidate={handleFormValidate}
          buttonState={submitButtonState}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
          onAddPlace={handleAddPlace}
          onFormValidate={handleFormValidate}
          buttonState={submitButtonState}
        />
        <DeletePlacePopup
          isOpen={deletePlaceConfirm.isOpen}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
          card={deletePlaceConfirm.card}
          onCardDelete={handleCardDelete}
          buttonState={submitButtonState}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
