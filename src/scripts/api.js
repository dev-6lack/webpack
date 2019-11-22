import {Card} from './card.js'
import {cardsContainer} from './mainModule.js'

const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const editName = document.querySelector('.popup__input_type_user-name');
    const editJob = document.querySelector('.popup__input_type_user-job');

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4/' : 'https://praktikum.tk/cohort4/';
const tokenId = '758cfa4a-a628-4502-9850-9cd5d728ca39';

class API {

  constructor (serverUrl, tokenId) {
    this.serverUrl = serverUrl;
    this.tokenId = tokenId;

    this.getInitialCards();
    this.uploadProfile();
  }


  uploadProfile() {
    fetch(this.serverUrl + 'users/me', {
      headers: {
          authorization: this.tokenId
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
  //  changeUser (){
  //   event.preventDefault();
  //   api.patchProfile();
  //   api.newUserInfo(editName.value, editJob.value);
  //   popup.close();
    
  // }
  newUserInfo (name, about) {
    userName.textContent = name;
    userJob.textContent = about;
  };

  patchProfile() {
    // let namePlace = document.querySelector('.user-info__name');
    // let jobPlace = document.querySelector('.user-info__job');

    event.preventDefault();

    // if (editName.value.length !== 0 && editJob.value.length !== 0) {

    // userName.textContent = editName.value;
    // userJob.textContent = editJob.value;

    fetch(this.serverUrl + 'users/me', {
      method: 'PATCH',
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
        //newUserInfo(result.name, result.about)
       })
      .catch((err)=>{
        console.log('ОШИБКА: '+err);
      })
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

export {userName, userJob, serverUrl, tokenId, API, api, editName, editJob}