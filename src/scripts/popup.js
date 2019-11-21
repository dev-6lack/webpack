const imagePopup = document.querySelector('.popup__image');
const popupPlace = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile');

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

  export {popup, imagePopup, popupPlace}