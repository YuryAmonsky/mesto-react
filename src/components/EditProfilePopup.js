import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}){
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const handleNameChange = (evt)=>{
    setName(evt.target.value);
  }

  const handleDescriptionChange = (evt)=>{
    setDescription(evt.target.value);
  }

  const handleSubmit = (evt)=>{
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return(
    <PopupWithForm 
          title="Редактировать профиль" 
          name="edit-profile"
          isOpen = {isOpen} 
          onClose = {onClose} 
          onSubmit = {handleSubmit}
          buttonText = "Сохранить"
    >
      <input className="dialog-form__input dialog-form__input_type_edit-profile-name" name="inputEditProfileName"
        id="input-edit-profile-name" type="text" placeholder="Имя" value={name} minLength="2" maxLength="40" required 
        onChange={handleNameChange} />
      <span className="dialog-form__input-error input-edit-profile-name-error"></span>
      <input className="dialog-form__input dialog-form__input_type_edit-profile-about-me" name="inputEditProfileAboutMe"
        id="input-edit-profile-about-me" type="text" placeholder="О себе" value={description} minLength="2" maxLength="200" required 
        onChange={handleDescriptionChange} />
      <span className="dialog-form__input-error input-edit-profile-about-me-error"></span>        
    </PopupWithForm>
  );
}

export default EditProfilePopup;