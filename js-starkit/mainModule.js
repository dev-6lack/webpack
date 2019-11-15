// константы и переменные----------------------------------------------------------------------------
const cardsContainer = document.querySelector('.places-list');
const popupPlace = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile');
const imagePopup = document.querySelector('.popup__image');
const lang = { 
  validationLenght: 'Должно быть от 2 до 30 символов',
  validationIsEmpty: 'Это обязательное поле',
}

//* Классы -------------------------------------------------------------------------------------------*/
class Card {
  
  constructor(name, link) {
    this.cardPlace = this.create(name, link);
    this.cardPlace.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardPlace.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.cardPlace.querySelector('.place-card__image').addEventListener('click', this.zoom);
  }

  // Создаем 10 карточек
  create(name, link) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('place-card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('place-card__image');
    cardImage.style.backgroundImage = `url(${link})`;

    const buttonDeleteElement = document.createElement('button');
    buttonDeleteElement.classList.add('place-card__delete-icon');

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = name;

    const buttonLike = document.createElement('button');
    buttonLike.classList.add('place-card__like-icon');

    cardContainer.appendChild(cardImage);
    cardImage.appendChild(buttonDeleteElement);
    cardContainer.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(buttonLike);

    return cardContainer;
  }

  // Лайкаем
  like(event) {
    if (event.target.classList.contains('place-card__like-icon')){ event.target.classList.toggle('place-card__like-icon_liked');}
  }

  // Удаляем
  remove(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {cardsContainer.removeChild(event.target.parentNode.parentNode);}
  }

  // Увеличиваем
  zoom(event) {
    const bigImage = document.querySelector('.popup__content_image');

    if (event.target.classList.contains('place-card__image')) {
      const imageLink = event.target.getAttribute('style');
      let imageLinkBig = imageLink.slice(23, -3);
      bigImage.style.backgroundImage = `url(${imageLinkBig})`;
      
      imagePopup.classList.add('popup_is-opened');
      imagePopup.classList.add('popup__content_image');
    }
    eventHandler() 
  }

}



class Popup {

  constructor(popupPlace, popupProfile, imagePopup){
    this.popupPlace = popupPlace;
    this.popupProfile = popupProfile;
    this.imagePopup = imagePopup;
  }

  //Открываем
  open(event) {
    if(event.target.classList.contains('user-info__button')) {this.popupPlace.classList.add('popup_is-opened');}
    if(event.target.classList.contains('user-edit__button')) {this.popupProfile.classList.add('popup_is-opened');}
  }

  //Закрываем
  close(event) {
    if (event.target.classList.contains('popup__close')) {this.popupPlace.classList.remove('popup_is-opened');}
    if (event.target.classList.contains('popup__profile-close')) {this.popupProfile.classList.remove('popup_is-opened');}
    if (event.target.classList.contains('popup__close_image')) {this.imagePopup.classList.remove('popup_is-opened');}
    if (event.target.classList.contains('popup__save-button')) {this.popupProfile.classList.remove('popup_is-opened');} 
    if (event.target.classList.contains('popup__button')) {this.popupPlace.classList.remove('popup_is-opened');}
  }
}

const popup = new Popup(popupPlace, popupProfile, imagePopup);

const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');

const serverUrl =  'http://95.216.175.5/cohort4/';
const tokenId = '758cfa4a-a628-4502-9850-9cd5d728ca39';

class API {

  constructor (serverUrl, tokenId) {
    this.serverUrl = serverUrl;
    this.tokenId = tokenId;

    this.getInitialCards();
    this.uploadProfile();
  }


  uploadProfile() {
    fetch(serverUrl + 'users/me', {
      headers: {
          authorization: tokenId
      }
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        else return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
          userName.textContent = result.name;
          userJob.textContent = result.about;
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  editProfile() {
    let namePlace = document.querySelector('.user-info__name');
    let jobPlace = document.querySelector('.user-info__job');

    event.preventDefault();
    const editName = document.querySelector('.popup__input_type_user-name');
    const editJob = document.querySelector('.popup__input_type_user-job');

    if (editName.value.length !== 0 && editJob.value.length !== 0) {

    namePlace.textContent = editName.value;
    jobPlace.textContent = editJob.value;

    fetch(this.serverUrl + 'users/me', {
      method: 'POST',
      headers: {
        authorization: this.tokenId,
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        name: editName.value,
        about: editJob.value,
      })
    })
      .then(res => res.json())
      .then((result) => {
        newUserInfo (result.name, result.about)//, result.avatar)
      })
      .catch((err)=>{
        console.log('ОШИБКА: '+err);
      })
    }
  }

  getInitialCards() {
    fetch(serverUrl + 'cards', {
      headers: {
          authorization: tokenId
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    else return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cards) => {
      cards.forEach( function(card) {
      cardsContainer.appendChild(new Card(card.name, card.link).cardPlace);
      });
    });
  }
}

const api = new API(serverUrl, tokenId);


//Функции-обработчики----------------------------------------------------------------------------------
//Валидация Профиля
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



//Токен: 758cfa4a-a628-4502-9850-9cd5d728ca39
//Идентификатор группы: cohort4

/***
 * Здравствуйте
 * 
 * можно лучше:
 * Такие условия лучше разбивать на небольшие условия
 *   } else if (inputUserName.value.length < 2 || inputUserName.value.length > 30 || inputUserJob.value.length < 2 || inputUserJob.value.length > 30) {
 * разбив на методы класса
 * 
 * Правильно что вынесли отдельно serverUrl, tokenId
 * 
 * функцию function buttonPlaceValidateHandler()
 * лучше разбить на 3 функции. одно условие, одна функция. И убрать всё в класс
 * тоже самое к function validateInput(errorSelector, input) 
 * 
 * 
 * Вы пытаетесь повесить события на каждую карточку
 * Вам надо повешать одно событие, согласно исходному коду на класс places-list,
 * А потом при клике пользователя отследить, куда пользователь кликнул, определив карточку и тип класса 
 * на котором произошло событие
 * сейчас у вас за это отвечает 
 *     this.cardPlace.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardPlace.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
 * 
 * 
 * Можно лучше. Не очень хорошая идея создавать виртуальный DOM при создании карточки, используйте лучше шаблон. 
 * Для примера можете посмотреть здесь https://wesbos.com/template-strings-html/
 * 
 * не правильно что вы в  getInitialCards() перебираете карточки что прислал сервер
 * Это надо делать в классе CardList. Кстати а где он ????????
 * Его надо вернуть
 * 
 * 
 */