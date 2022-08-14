import React from 'react';
function PopupWithImage(){
  return(
    <div className="popup popup_type_view-image">
      <div className="popup__container">
        <button className="popup__close-icon" type="button"></button>
        <img className="original-image" src="#" alt="" />
        <h3 className="image-caption">Подпись к картинке</h3>
      </div>
    </div>
  );
}

export default PopupWithImage;