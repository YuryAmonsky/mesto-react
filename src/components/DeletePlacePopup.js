import React from "react";
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup({isOpen, onClose, onBGClick, card, onCardDelete}){
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-location"
      isOpen={isOpen}
      onClose={onClose}
      onBGClick={onBGClick}
      onSubmit={handleSubmit}
      buttonText="Да"
    />
  );
}

export default DeletePlacePopup;