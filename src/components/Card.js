import React from 'react';

function Card(props){
  const handleClick = ()=>{
    props.onCardClick(props.card);
  }
  return (   
    <li className="location">
      <button className="location__delete-icon" type="button"></button>
      <img className="location__image" src={props.card.link} alt={`Фотография места ${props.card.name}`} onClick={handleClick}/>
      <h2 className="location__name">{props.card.name}</h2>
      <div className="location__like-group">
        <button className="location__like" type="button"></button>
        <span className="location__likes-number">{props.card.likes.length}</span>
      </div>
    </li>
  );
}

export default Card;