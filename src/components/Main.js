import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import Card from './Card';

function Main({onEditProfile, onEditAvatar, onNewLocation, onCardClick}) {
 
  const [cards, setCards] = React.useState([]);
  
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardLike = (card)=>{
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard)=>{
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err=>{
        console.log(err.status);
        alert(`Ошибка загрузки данных карточки:\n ${err.status}\n ${err.text}`);
      });
  }

  const handleCardDelete = (card)=>{
    api.deleteLocation(card._id)
    .then(res=>{
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
  }
  
  React.useEffect(() => {   
      /*загрузка списка карточек*/
      api.loadLocations()    
      .then((res) => {        
        setCards([...res]);
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка загрузки списка карточек:\n ${err.status}\n ${err.text}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__about-me">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onNewLocation}></button>
      </section>
      <section aria-label="locations">
        <ul className="location-list">
          {
            cards.map((card) =>
              <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
            )
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;