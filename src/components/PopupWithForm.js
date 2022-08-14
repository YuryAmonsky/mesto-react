import React from 'react';
function PopupWithForm(props){
  return(
    <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened`: `popup popup_type_${props.name}`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button"></button>
        <form className={`dialog-form dialog-form_type_${props.name}`} name={props.name} novalidate>
          <h2 className="dialog-form__title dialog-form__title_type_edit-profile">{props.title}</h2>
          {props.children}
            
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;