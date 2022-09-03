/** Валидация формы происходит по схеме:
 * Пока вводим текст в поле просто проверяем валидный инпут или нет, но не показываем ошибку.
 * Если инпут не валидный делаем кнопку неактивной, ошибку не показываем.
 * Ошибку показываем при потере инпутом фокуса или отсутствии ввода в течение 5 секунд.
 * в onFormValidate из App.js проверяется все ли инпуты валидны и в соответсвии с этим меняется состояние кнопки сабмита.
*/

import { useState, useRef, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onFormValidate, ...commonProps }) {  
  const avatarLink = useRef();
  /**isInitialState используется, 
   * для срабатывания эффектов только в определенных ситуациях*/
  const isInitialState = useRef(true);
  const timer = useRef(0);
  const prevInputValue = useRef('');
  const [isLinkValid, setIsLinkValid] = useState(true);
  const [linkErrorHint, setLinkErrorHint] = useState('');

  const handleLinkChange = (evt) => {
    if (isInitialState.current) isInitialState.current = false;
    setIsLinkValid(evt.target.validity.valid);
    prevInputValue.current = avatarLink.current.value;    
  }

  const handleLinkBlur = (evt) => {
    if (timer.current) clearTimeout(timer.current);
    setLinkErrorHint(evt.target.validationMessage);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  }

  /**Инициализация инпутов при закрытии попапа значениями из currentUser */
  useEffect(() => {
    if (!isOpen) {
      avatarLink.current.value = '';
      setIsLinkValid(true);
      setLinkErrorHint('');
      isInitialState.current = true;
    }
  }, [isOpen]);

  /**показ ошибки при отсутствии ввода в поле link в течение 5сек 
   * в случае невалидного значения инпута
  */
  useEffect(() => {
    const cbCheckInputCompletion = (errorText) => {
      if (!isLinkValid && prevInputValue.current === avatarLink.current.value) {
        setLinkErrorHint(errorText);
      }
    }
    if (isOpen && !isInitialState.current) {
      if (linkErrorHint) setLinkErrorHint(avatarLink.current.validationMessage);  
      if (timer.current) clearTimeout(timer.current);      
      timer.current = setTimeout(() => { cbCheckInputCompletion(avatarLink.current.validationMessage) }, 5000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    }
  }, [isOpen, linkErrorHint, isLinkValid]);

  useEffect(() => {
    onFormValidate(isLinkValid, 'edit-avatar');
  }, [isLinkValid, onFormValidate]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      {...commonProps}
    >
      <input
        ref={avatarLink}
        className="dialog-form__input dialog-form__input_type_edit-avatar"
        name="inputEditAvatar"
        id="input-edit-avatar"
        type="url"
        placeholder="Ссылка на картинку"         
        required
        autoComplete="off"
        onInput={handleLinkChange}
        onBlur={handleLinkBlur}
      />
      <span
        className="dialog-form__input-error input-edit-avatar-error"
      >
        {linkErrorHint}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;