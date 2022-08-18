import React from 'react';
function ImagePopup(props){ 
  return(
    <div className={`popup popup_type_view-image ${props.card? 'popup_opened':''}`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
        <img className="original-image" src={props.card?.link} alt={`Фотография места ${props.card?.name}`} />
        <h3 className="image-caption">{props.card?.name}</h3>
      </div>
    </div>
  );  
}

export default ImagePopup;