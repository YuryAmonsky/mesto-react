/** Валидация формы происходит по схеме:
 * Пока вводим текст в поле просто проверяем валидный инпут или нет, но не показываем ошибку.
 * Если инпут не валидный делаем кнопку неактивной, ошибку не показываем.
 * Ошибку показываем при потере инпутом фокуса или отсутствии ввода в течение 5 секунд.
 * в onFormValidate из App.js проверяется все ли инпуты валидны и в соответсвии с этим меняется состояние кнопки сабмита.
*/
import { useState, useRef, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace, onFormValidate, ...commonProps }) {
  /**isInitialState используется, 
   * для срабатывания эффектов только в определенных ситуациях*/
  const isInitialState = useRef(true);
  const timer = useRef(0);
  const prevInputValue = useRef('');
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [nameValidity, setNameValidity] = useState({ isValid: false, message: '' });
  const [linkValidity, setLinkValidity] = useState({ isValid: false, message: '' });
  const [nameErrorHint, setNameErrorHint] = useState('');
  const [linkErrorHint, setLinkErrorHint] = useState('');

  const handleNameChange = (evt) => {
    if (isInitialState.current) isInitialState.current = false;
    setName(evt.target.value);
    setNameValidity({ isValid: evt.target.validity.valid, message: evt.target.validationMessage });
  }

  const handleLinkChange = (evt) => {
    if (isInitialState.current) isInitialState.current = false;
    setLink(evt.target.value);
    setLinkValidity({ isValid: evt.target.validity.valid, message: evt.target.validationMessage });
  }

  const handleNameBlur = (evt) => {
    if (timer.current) clearTimeout(timer.current);
    setNameErrorHint(nameValidity.message);

  }

  const handleLinkBlur = (evt) => {
    if (timer.current) clearTimeout(timer.current);
    setLinkErrorHint(linkValidity.message);
  }

  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  /**Инициализация инпутов при закрытии попапа*/
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
      setNameErrorHint('');
      setLinkErrorHint('');
      isInitialState.current = true;
    }
  }, [isOpen]);

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
      //setIsNameValid(inputName.current.validity.valid);
      if (timer.current) clearTimeout(timer.current);
      prevInputValue.current = name;
      timer.current = setTimeout(() => { cbCheckInputCompletion(nameValidity.message) }, 5000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    }
  }, [isOpen, name, nameErrorHint, nameValidity]);

  /**показ ошибки при отсутствии ввода в поле link в течение 5сек 
  * в случае невалидного значения инпута
 */
  useEffect(() => {
    const cbCheckInputCompletion = (errorText) => {
      if (!linkValidity.isValid && prevInputValue.current === link) {
        setLinkErrorHint(errorText);
      }
    }
    if (isOpen && !isInitialState.current) {
      if (linkErrorHint) setLinkErrorHint(linkValidity.message);
      if (timer.current) clearTimeout(timer.current);
      prevInputValue.current = link;
      timer.current = setTimeout(() => { cbCheckInputCompletion(linkValidity.message) }, 5000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    }
  }, [isOpen, link, linkErrorHint, linkValidity]);


  useEffect(() => {
    onFormValidate(nameValidity.isValid && linkValidity.isValid, 'new-location');
  }, [nameValidity.isValid, linkValidity.isValid, onFormValidate]);

  return (
    <PopupWithForm
      title="Новое место"
      name="new-location"
      isOpen={isOpen}
      onSubmit={handleAddPlaceSubmit}
      {...commonProps}
    >
      <input
        className={nameErrorHint ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="inputNewLocationName"
        id="input-new-location-name"
        type="text"
        placeholder="Название"
        value={name}
        minLength="2"
        maxLength="30"
        required
        autoComplete="off"
        onInput={handleNameChange}
        onBlur={handleNameBlur}
      />
      <span
        className="dialog-form__input-error"
      >
        {nameErrorHint}
      </span>
      <input
        className={linkErrorHint ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="inputNewLocationLink"
        id="input-new-location-link"
        type="url"
        placeholder="Ссылка на картинку"
        value={link}
        required
        autoComplete="off"
        onInput={handleLinkChange}
        onBlur={handleLinkBlur}
      />
      <span
        className="dialog-form__input-error"
      >
        {linkErrorHint}
      </span>
    </PopupWithForm>
  );

}

export default AddPlacePopup;