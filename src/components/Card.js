import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick}){
  const handleClick = ()=>{
    onCardClick(card);
  }
 
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  return (   
    <li className="location">
      {isOwn && <button className="location__delete-icon" type="button"></button>}
      <img className="location__image" src={card.link} alt={`Фотография места ${card.name}`} onClick={handleClick}/>
      <h2 className="location__name">{card.name}</h2>
      <div className="location__like-group">
        <button className={isLiked ? "location__like location__like_active":"location__like"} type="button"></button>
        <span className="location__likes-number">{card.likes.length}</span>
      </div>
    </li>
  );
}

export default Card;