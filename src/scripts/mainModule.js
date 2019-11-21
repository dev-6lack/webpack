import "../pages/index.css"
import {api} from './api.js'
import {popup, popupPlace} from './popup.js'
import {validateInput, popupSaveButton, inputUserJob, inputUserName, popupAddButton, buttonPlaceValidateHandler} from './validate.js'
import {Card} from './card.js'

const cardsContainer = document.querySelector('.places-list');

export {cardsContainer}
//Слушатели ------------------------------------------------------------------------------

document.querySelector('.user-info__button').addEventListener('click', function () {
  popup.open(event);
 });

 document.querySelector('.user-edit__button').addEventListener('click', function () {
  popup.open(event);
});

popupPlace.querySelector('.popup__close').addEventListener('click', function () {
  popup.close(event);
 });

 document.querySelector('.popup__profile-close').addEventListener('click', function () {
  popup.close(event);
 });

 document.querySelector('.popup__close_image').addEventListener('click', function () {
  popup.close(event);
 });

document.forms.new.addEventListener('submit', function() {
  const addName = document.querySelector('.popup__input_type_name');
  const addLink = document.querySelector('.popup__input_type_link-url');

  event.preventDefault();
  const addCard = new Card(addName.value, addLink.value);
  cardsContainer.appendChild(addCard.cardPlace);
  document.forms.new.reset();
});

document.forms.profile.addEventListener('submit', api.editProfile);

popupSaveButton.addEventListener('click', function(){
  popup.close(event);
});

popupAddButton.addEventListener('click', function(){
  popup.close(event);
 });

inputUserJob.addEventListener('input', () => validateInput('.error__job', inputUserJob));
inputUserName.addEventListener('input', () => validateInput('.error__user', inputUserName));
document.querySelector('.popup__form').addEventListener('input', buttonPlaceValidateHandler);

