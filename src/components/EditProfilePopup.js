import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onUpdateUser, onFormValidate, ...commonProps}) {
  /**Пока вводим текст в поле просто проверяем валидный инпут или нет, но не показываем ошибку.
   * Если инпут не валидный делаем кнопку неактивной, ошибку не показываем.
   * Ошибку показываем при потере инпутом фокуса или отсутствии ввода в течение 5 секунд.
   * в onFormValidate из App.js проверяется все ли инпуты валидны и в соответсвии с этим меняется состояние кнопки сабмита.
  */
  
  const currentUser = React.useContext(CurrentUserContext);
  const inputName = React.useRef();
  const inputDescription = React.useRef();
  let timer = React.useRef(0);
  let prevInputValue = React.useRef('');
  const [name, setName] = React.useState('');  
  const [description, setDescription] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = React.useState(true);
  const [nameErrorHint, setNameErrorHint] = React.useState('');
  const [descriptionErrorHint, setDescriptionErrorHint] = React.useState('');
    
  const handleNameChange = (evt) => {      
    setName(evt.target.value);
    if(nameErrorHint) setNameErrorHint(evt.target.validationMessage);
  }

  const handleDescriptionChange = (evt) => {     
    setDescription(evt.target.value);
    if(descriptionErrorHint) setDescriptionErrorHint(evt.target.validationMessage);    
  }
  
  const handleNameBlur = (evt)=>{
    if (timer.current) clearTimeout(timer.current);
    setNameErrorHint(evt.target.validationMessage);
  }

  const handleDescriptionBlur = (evt)=>{
    if (timer.current) clearTimeout(timer.current);
    setDescriptionErrorHint(evt.target.validationMessage);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,      
      about: description,      
    });
  }

  /**Инициализация инпутов при закрытии попапа значениями из currentUser */  
  React.useEffect(() => {    
    if (!isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);      
      setNameErrorHint('');
      setDescriptionErrorHint('');
    }
  }, [isOpen, currentUser]);
  
  /**показ ошибки при отсутствии ввода в поле name в течение 5сек 
   * в случае невалидного значения инпута
  */
  React.useEffect(()=>{
    const cbCheckInputCompletion = (errorText)=>{
      if(!isNameValid && prevInputValue.current===name){
        setNameErrorHint(errorText);
      }
    }    
    setIsNameValid(inputName.current.validity.valid);
    if (timer.current) clearTimeout(timer.current);
    prevInputValue.current = name;    
    timer.current = setTimeout(()=>{cbCheckInputCompletion(inputName.current.validationMessage)}, 5000);
    return ()=>{
      if (timer.current) clearTimeout(timer.current);
    }
  }, [name, isNameValid]);

   /**показ ошибки при отсутствии ввода в поле description в течение 5сек 
   * в случае невалидного значения инпута
  */
    React.useEffect(()=>{
      const cbCheckInputCompletion = (errorText)=>{
        if(!isDescriptionValid && prevInputValue.current===description){
          setDescriptionErrorHint(errorText);
        }
      }
      setIsDescriptionValid(inputDescription.current.validity.valid);
      if (timer.current) clearTimeout(timer.current);
      prevInputValue.current = description;    
      timer.current = setTimeout(()=>{cbCheckInputCompletion(inputDescription.current.validationMessage)}, 5000);
      return ()=>{
        if (timer.current) clearTimeout(timer.current);
      }
    }, [description, isDescriptionValid]);


  React.useEffect(()=>{
    onFormValidate(isNameValid && isDescriptionValid);
  }, [isNameValid, isDescriptionValid, onFormValidate]);
 
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onSubmit={handleSubmit}      
      {...commonProps}
    >
      <input 
        ref={inputName} 
        className={nameErrorHint ? "dialog-form__input dialog-form__input_invalid": "dialog-form__input"} 
        name="inputEditProfileName"
        id="input-edit-profile-name" 
        type="text" placeholder="Имя" 
        value={name} 
        minLength="2" 
        maxLength="40" 
        required
        onInput={handleNameChange} 
        onBlur={handleNameBlur}
      />
      <span className="dialog-form__input-error input-edit-profile-name-error">
        {nameErrorHint}
      </span>
      <input 
        ref={inputDescription} 
        className={descriptionErrorHint ? "dialog-form__input dialog-form__input_invalid" :"dialog-form__input"} 
        name="inputEditProfileAboutMe"
        id="input-edit-profile-about-me" 
        type="text" placeholder="О себе" 
        value={description} 
        minLength="2" 
        maxLength="200" 
        required
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