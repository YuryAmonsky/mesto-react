import React from 'react';

function Card({card, onCardClick}){
  const handleClick = ()=>{
    onCardClick(card);
  }
  return (   
    <li className="location">
      <button className="location__delete-icon" type="button"></button>
      <img className="location__image" src={card.link} alt={`Фотография места ${card.name}`} onClick={handleClick}/>
      <h2 className="location__name">{card.name}</h2>
      <div className="location__like-group">
        <button className="location__like" type="button"></button>
        <span className="location__likes-number">{card.likes.length}</span>
      </div>
    </li>
  );
}

export default Card;