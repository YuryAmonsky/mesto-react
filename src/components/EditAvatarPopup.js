import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onBGClick, onUpdateAvatar, buttonText}) {
  const avatarLink = React.useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onBGClick={onBGClick}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input ref={avatarLink} className="dialog-form__input dialog-form__input_type_edit-avatar" name="inputEditAvatar"
        id="input-edit-avatar" type="url" placeholder="Ссылка на картинку" required />
      <span className="dialog-form__input-error input-edit-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;