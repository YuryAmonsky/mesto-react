/** Валидация формы происходит по схеме:
 * Пока вводим текст в поле просто проверяем валидный инпут или нет, но не показываем ошибку.
 * Если инпут не валидный делаем кнопку неактивной, ошибку не показываем.
 * Ошибку показываем при потере инпутом фокуса или отсутствии ввода в течение 5 секунд.
 * в onFormValidate из App.js проверяется все ли инпуты валидны и в соответсвии с этим меняется состояние кнопки сабмита.
*/

import { useContext, useState, useRef, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onFormValidate, ...commonProps }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarLink = useRef();
  let timer = useRef(0);
  let prevInputValue = useRef('');
  const [link, setLink] = useState('');
  const [isLinkValid, setIsLinkValid] = useState(true);
  const [linkErrorHint, setLinkErrorHint] = useState('');

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
    if (linkErrorHint) setLinkErrorHint(evt.target.validationMessage);
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
      avatarLink.current.value = currentUser.avatar;
      setLinkErrorHint('');
    }
  }, [isOpen, currentUser]);

  /**показ ошибки при отсутствии ввода в поле link в течение 5сек 
   * в случае невалидного значения инпута
  */
  useEffect(() => {
    const cbCheckInputCompletion = (errorText) => {
      if (!isLinkValid && prevInputValue.current === avatarLink.current.value) {
        setLinkErrorHint(errorText);
      }
    }
    setIsLinkValid(avatarLink.current.validity.valid);
    if (timer.current) clearTimeout(timer.current);
    prevInputValue.current = link;
    timer.current = setTimeout(() => { cbCheckInputCompletion(avatarLink.current.validationMessage) }, 5000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    }
  }, [link, isLinkValid]);

  useEffect(() => {
    onFormValidate(isLinkValid);
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