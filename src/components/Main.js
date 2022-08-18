import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  //const [userInfo, setUserInfoObj] = React.useState('');

  React.useEffect(() => {
    Promise.all([
      /**загрузка данных пользователя в профиль*/
      api.getUserInfo(),
      /*загрузка списка карточек*/
      api.loadLocations()
    ])
      .then((values) => {
        setUserName(values[0].name);
        setUserDescription(values[0].about);
        setUserAvatar(values[0].avatar);
        setCards([...values[1]]);
      })
      .catch((err) => {
        console.log(err.status);
        alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.text}`);
      });
  }, []);

  return (
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
          {
            cards.map((card) =>
              <li key={card._id} className="location">
                <Card card={card} onCardClick={props.onCardClick} />
              </li>
            )
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;