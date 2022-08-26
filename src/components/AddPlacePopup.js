import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onBGClick, onAddPlace }) {  
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  }

  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ name, link });
  }
  /*ресет инпутов при закрытии формы*/
  React.useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen])

  return (
    <PopupWithForm
      title="Новое место"
      name="new-location"
      isOpen={isOpen}
      onClose={onClose}
      onBGClick={onBGClick}
      onSubmit={handleAddPlaceSubmit}
      buttonText="Создать"
    >
      <input className="dialog-form__input dialog-form__input_type_new-location-name" name="inputNewLocationName"
        id="input-new-location-name" type="text" placeholder="Название" value={name} minLength="2" maxLength="30" required onChange={handleNameChange} />
      <span className="dialog-form__input-error input-new-location-name-error"></span>
      <input className="dialog-form__input dialog-form__input_type_new-location-link" name="inputNewLocationLink"
        id="input-new-location-link" type="url" placeholder="Ссылка на картинку" value={link} required onChange={handleLinkChange} />
      <span className="dialog-form__input-error input-new-location-link-error"></span>
    </PopupWithForm>
  );

}

export default AddPlacePopup;