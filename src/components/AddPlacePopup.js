import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace, onFormValidate, ...commonProps }) {
  const inputName = React.useRef();
  const inputLink = React.useRef();
  /**isInitialState используется, 
   * для срабатывания эффектов только в определенных ситуациях*/
  let isInitialState = React.useRef(true);
  let timer = React.useRef(0);
  let prevInputValue = React.useRef('');
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isLinkValid, setIsLinkValid] = React.useState(false);
  const [nameErrorHint, setNameErrorHint] = React.useState('');
  const [linkErrorHint, setLinkErrorHint] = React.useState('');

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
  React.useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
      setNameErrorHint('');
      setLinkErrorHint('');
      setIsNameValid(false);
      setIsLinkValid(false);
      isInitialState.current = true;
    }
  }, [isOpen]);

  /**показ ошибки при отсутствии ввода в поле name в течение 5сек 
   * в случае невалидного значения инпута
  */
  React.useEffect(() => {
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
  React.useEffect(() => {
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


  React.useEffect(() => {
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