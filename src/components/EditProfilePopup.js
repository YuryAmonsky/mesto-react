/** Валидация формы происходит по схеме:
 *  Пока вводим текст в поле просто проверяем валидный инпут или нет, но не показываем ошибку.
   * Если инпут не валидный делаем кнопку неактивной, ошибку не показываем.
   * Ошибку показываем при потере инпутом фокуса или отсутствии ввода в течение 5 секунд.
   * в onFormValidate из App.js проверяется все ли инпуты валидны и в соответсвии с этим меняется состояние кнопки сабмита.
  */
import { useContext, useState, useRef, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onUpdateUser, onFormValidate, ...commonProps }) {
  const currentUser = useContext(CurrentUserContext);
  /**isInitialState используется, 
   * для срабатывания эффектов только в определенных ситуациях*/
  const isInitialState = useRef(true);
  const timer = useRef(0);
  const prevInputValue = useRef('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameValidity, setNameValidity] = useState({ isValid: true, message: '' });
  const [descriptionValidity, setDescriptionValidity] = useState({ isValid: true, message: '' });
  const [nameErrorHint, setNameErrorHint] = useState('');
  const [descriptionErrorHint, setDescriptionErrorHint] = useState('');

  const handleNameChange = (evt) => {
    if (isInitialState.current) isInitialState.current = false;
    setName(evt.target.value);
    setNameValidity({ isValid: evt.target.validity.valid, message: evt.target.validationMessage });
  }

  const handleDescriptionChange = (evt) => {
    if (isInitialState.current) isInitialState.current = false;
    setDescription(evt.target.value);
    setDescriptionValidity({ isValid: evt.target.validity.valid, message: evt.target.validationMessage });
  }

  const handleNameBlur = (evt) => {
    if (timer.current) clearTimeout(timer.current);
    setNameErrorHint(nameValidity.message);
  }

  const handleDescriptionBlur = (evt) => {
    if (timer.current) clearTimeout(timer.current);
    setDescriptionErrorHint(descriptionValidity.message);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  /**Инициализация инпутов при закрытии попапа значениями из currentUser */
  useEffect(() => {
    if (!isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setNameErrorHint('');
      setDescriptionErrorHint('');
      isInitialState.current = true;
    }
  }, [isOpen, currentUser]);

  /**показ ошибки при отсутствии ввода в поле name в течение 5сек 
   * в случае невалидного значения инпута
  */
  useEffect(() => {
    const cbCheckInputCompletion = (errorText) => {
      if (!nameValidity.isValid && prevInputValue.current === name) {
        setNameErrorHint(errorText);
      }
    }
    if (isOpen && !isInitialState.current) {
      if (nameErrorHint) setNameErrorHint(nameValidity.message);

      if (timer.current) clearTimeout(timer.current);
      prevInputValue.current = name;
      timer.current = setTimeout(() => { cbCheckInputCompletion(nameValidity.message) }, 5000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    }
  }, [isOpen, name, nameErrorHint, nameValidity]);

  /**показ ошибки при отсутствии ввода в поле description в течение 5сек 
  * в случае невалидного значения инпута
 */
  useEffect(() => {
    const cbCheckInputCompletion = (errorText) => {
      if (!descriptionValidity.isValid && prevInputValue.current === description) {
        setDescriptionErrorHint(errorText);
      }
    }
    if (isOpen && !isInitialState.current) {
      if (descriptionErrorHint) setDescriptionErrorHint(descriptionValidity.message);
      if (timer.current) clearTimeout(timer.current);
      prevInputValue.current = description;
      timer.current = setTimeout(() => { cbCheckInputCompletion(descriptionValidity.message) }, 5000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    }
  }, [isOpen, description, descriptionErrorHint, descriptionValidity]);


  useEffect(() => {
    onFormValidate(nameValidity.isValid && descriptionValidity.isValid, 'edit-profile');
  }, [nameValidity.isValid, descriptionValidity.isValid, onFormValidate]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      {...commonProps}
    >
      <input
        className={nameErrorHint ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="inputEditProfileName"
        id="input-edit-profile-name"
        type="text" placeholder="Имя"
        value={name}
        minLength="2"
        maxLength="40"
        required
        autoComplete="off"
        onInput={handleNameChange}
        onBlur={handleNameBlur}
      />
      <span className="dialog-form__input-error input-edit-profile-name-error">
        {nameErrorHint}
      </span>
      <input
        className={descriptionErrorHint ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="inputEditProfileAboutMe"
        id="input-edit-profile-about-me"
        type="text" placeholder="О себе"
        value={description}
        minLength="2"
        maxLength="200"
        required
        autoComplete="off"
        onInput={handleDescriptionChange}
        onBlur={handleDescriptionBlur}
      />
      <span className="dialog-form__input-error input-edit-profile-about-me-error">
        {descriptionErrorHint}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;