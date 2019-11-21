const lang = { 
    validationLenght: 'Должно быть от 2 до 30 символов',
    validationIsEmpty: 'Это обязательное поле',
}

//Валидация Попапа Профиля
const popupSaveButton = document.querySelector('.popup__save-button');

function validateInput(errorSelector, input) {
  const errorMessageName = document.querySelector(errorSelector);
      
      if (input.value.length === 0) {
        errorMessageName.textContent = lang.validationIsEmpty;
        popupSaveButton.setAttribute('disabled', true);
        popupSaveButton.classList.remove('popup__button_active');
      }
      else if (input.value.length < 2 || input.value.length > 30) {
        errorMessageName.textContent = lang.validationLenght;
        popupSaveButton.setAttribute('disabled', true);
        popupSaveButton.classList.remove('popup__button_active');
      }
      else {
        errorMessageName.textContent = '';
        popupSaveButton.removeAttribute('disabled', true);
        popupSaveButton.classList.add('popup__button_active');
      }
}

//Валидация кнопки пользователя
const inputUserJob = document.querySelector('.popup__input_type_user-job');
const inputUserName = document.querySelector('.popup__input_type_user-name');

function buttonUserValidateHandler() {
  if (inputUserName.value.length === 0 || inputUserJob.value.length === 0) {
    popupSaveButton.setAttribute('disabled', true);
    popupSaveButton.classList.remove('popup__button_active');
  } else if (inputUserName.value.length < 2 || inputUserName.value.length > 30 || inputUserJob.value.length < 2 || inputUserJob.value.length > 30) {
    popupSaveButton.setAttribute('disabled', true);
    popupSaveButton.classList.remove('popup__button_active');
  }
  else {
    popupSaveButton.removeAttribute('disabled');
    popupSaveButton.classList.add('popup__button_active');
  }
}

//Валидация кнопки места
const popupAddButton = document.querySelector('.popup__button');
const inputName = document.querySelector('.popup__input_type_name');
const inputLink = document.querySelector('.popup__input_type_link-url');

function buttonPlaceValidateHandler() {
  if (inputName.value.length === 0 || inputLink.value.length === 0) {
    popupAddButton.setAttribute('disabled', true);
    popupAddButton.classList.remove('popup__button_active');
  } else if (inputName.value.length < 2 || inputName.value.length > 30 || inputLink.value.length < 2 ) {
    popupAddButton.setAttribute('disabled', true);
    popupAddButton.classList.remove('popup__button_active');
  } 
  else {
    popupAddButton.removeAttribute('disabled');
    popupAddButton.classList.add('popup__button_active');
  }
}

export {validateInput, buttonPlaceValidateHandler, popupSaveButton, inputUserName, inputUserJob, popupAddButton}