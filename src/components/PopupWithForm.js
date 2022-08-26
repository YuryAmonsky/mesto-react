import React from 'react';
function PopupWithForm({title, name, isOpen, onClose, onSubmit, onBGClick, buttonText, children}){
  
  return(
    <div className={isOpen ? `popup popup_type_${name} popup_opened`: `popup popup_type_${name}`}>
      <div className="popup__container" onClick={onBGClick}>
        <button className="popup__close-icon" type="button" onClick={onClose}></button>
        <form className={`dialog-form dialog-form_type_${name}`} name={name} onSubmit={onSubmit}>
          <h2 className="dialog-form__title">{title}</h2>
          {children}
          <button className="dialog-form__submit-button" type="submit" name="submitButton"
           formMethod="post">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;