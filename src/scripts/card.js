import {cardsContainer} from './mainModule.js'
import {imagePopup} from './popup.js'

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
    }
  }

  export {Card}