export default class Popup {
    constructor() {
        this.signIn = document.querySelector('#signInPopup');
        this.signUp = document.querySelector('#signUpPopup');
        this.registered = document.querySelector('#registeredPopup');
    }
    
    close(event) {
        event.path[2].classList.remove('popup_opened');
    }
    signInOpen() {
        this.signIn.classList.add('popup_opened');
    }
    signUpOpen() {
        this.signUp.classList.add('popup_opened');
    }
    registeredOpen() {
        this.registered.classList.add('popup_opened');
    }
}