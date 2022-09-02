/** Валидация формы происходит по схеме:
 * Пока вводим текст в поле просто проверяем валидный инпут или нет, но не показываем ошибку.
 * Если инпут не валидный делаем кнопку неактивной, ошибку не показываем.
 * Ошибку показываем при потере инпутом фокуса или отсутствии ввода в течение 5 секунд.
 * в onFormValidate из App.js проверяется все ли инпуты валидны и в соответсвии с этим меняется состояние кнопки сабмита.
*/
import { useState, useRef, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace, onFormValidate, ...commonProps }) {
  const inputName = useRef();
  const inputLink = useRef();
  /**isInitialState используется, 
   * для срабатывания эффектов только в определенных ситуациях*/
  const isInitialState = useRef(true);
  const timer = useRef(0);
  const prevInputValue = useRef('');
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [nameErrorHint, setNameErrorHint] = useState('');
  const [linkErrorHint, setLinkErrorHint] = useState('');

  const handleNameChange = (evt) => {
    if (isInitialState.current) isInitialState.current = false;
    setName(evt.target.value);
    if (nameErrorHint) setNameErrorHint(evt.target.validationMessage);
  }

  const handleLinkChange = (evt) => {
    if (isInitialState.current) isInitialState.current = false;
    setLink(evt.target.value);
    if (linkErrorHint) setLinkErrorHint(evt.target.validationMessage);
  }

  const handleNameBlur = (evt) => {
    if (timer.current) clearTimeout(timer.current);
    setNameErrorHint(evt.target.validationMessage);
  }

  const handleLinkBlur = (evt) => {
    if (timer.current) clearTimeout(timer.current);
    setLinkErrorHint(evt.target.validationMessage);
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
      if (!isNameValid && prevInputValue.current === name) {
        setNameErrorHint(errorText);
      }
    }
    if (isOpen && !isInitialState.current) {
      setIsNameValid(inputName.current.validity.valid);
      if (timer.current) clearTimeout(timer.current);
      prevInputValue.current = name;
      timer.current = setTimeout(() => { cbCheckInputCompletion(inputName.current.validationMessage) }, 5000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    }
  }, [isOpen, name, isNameValid]);

  /**показ ошибки при отсутствии ввода в поле link в течение 5сек 
  * в случае невалидного значения инпута
 */
  useEffect(() => {
    const cbCheckInputCompletion = (errorText) => {
      if (!isLinkValid && prevInputValue.current === link) {
        setLinkErrorHint(errorText);
      }
    }
    if (isOpen && !isInitialState.current) {
      setIsLinkValid(inputLink.current.validity.valid);
      if (timer.current) clearTimeout(timer.current);
      prevInputValue.current = link;
      timer.current = setTimeout(() => { cbCheckInputCompletion(inputLink.current.validationMessage) }, 5000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    }
  }, [isOpen, link, isLinkValid]);


  useEffect(() => {
    onFormValidate(isNameValid && isLinkValid);
  }, [isNameValid, isLinkValid, onFormValidate]);

  return (
    <PopupWithForm
      title="Новое место"
      name="new-location"
      isOpen={isOpen}
      onSubmit={handleAddPlaceSubmit}
      {...commonProps}
    >
      <input
        ref={inputName}
        className={nameErrorHint ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="inputNewLocationName"
        id="input-new-location-name"
        type="text"
        placeholder="Название"
        value={name}
        minLength="2"
        maxLength="30"
        required
        autoComplete = "off"
        onInput={handleNameChange}
        onBlur={handleNameBlur}
      />
      <span
        className="dialog-form__input-error"
      >
        {nameErrorHint}
      </span>
      <input
        ref={inputLink}
        className={linkErrorHint ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="inputNewLocationLink"
        id="input-new-location-link"
        type="url"
        placeholder="Ссылка на картинку"
        value={link}
        required
        autoComplete = "off"
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