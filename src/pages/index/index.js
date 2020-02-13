import "./index.css";

/* fa01878ef86944b3b9eae4c12b3f9447 */
/* fetch("https://newsapi.org/v2/everything?q=Природа&from=2020-01-11&sortBy=publishedAt&pageSize=100&apiKey=fa01878ef86944b3b9eae4c12b3f9447")
    .then(res => res.json())
    .then(res => console.log(res)); */

const serverUrl = 'http://localhost:3000';

import MainApi from "../../script/mainapi.js";
import Popup from "../../script/popup.js";

const mainapi = new MainApi({
    baseUrl: serverUrl,
})
const popups = new Popup();

const authButton = document.querySelector("#authorize");
authButton.addEventListener('click', function() {
    popups.signInOpen(event);
});

const signInForm = document.forms.signin;
const signInEmail = signInForm.elements.email;
const signInPassword = signInForm.elements.password;
const signInPasswordError = signInForm.querySelector("#wrongPasswordError");
const signInButton = signInForm.querySelector("#signIn");
const signInToSignUpButton = document.querySelector("#gotoSignUp");

signInEmail.addEventListener('input', validate);  
signInPassword.addEventListener('input', validate); 

signInToSignUpButton.addEventListener('click', function() {
    popups.signIn.classList.remove('popup_opened');
    popups.signUpOpen();
})

signInForm.addEventListener('submit', function() {
    event.preventDefault();
    signInPasswordError.textContent = "";
    signInButton.textContent = 'Загрузка...';
    mainapi.signIn(signInEmail.value, signInPassword.value)
        .then(res => {
            if(res.message) {
                console.log(res.message)
                signInPasswordError.textContent = res.message;
                signInButton.textContent = 'Войти';
            } else {
                popups.signIn.classList.remove('popup_opened');
                signInButton.textContent = 'Войти';
                signInForm.reset();
                //menu.render
            }
        })
});






const signUpForm = document.forms.signup;
const signUpEmail = signUpForm.elements.email;
const signUpPassword = signUpForm.elements.password;
const signUpName = signUpForm.elements.name;
const signUpEmailError = signUpForm.querySelector("#emailError");
const signUpPasswordError = signUpForm.querySelector("#passwordError");
const signUpNameError = signUpForm.querySelector("#nameError");
const signUpExistError = signUpForm.querySelector("#existError");
const signUpButton = signUpForm.querySelector("#signUp");
const signUpToSignInButton = document.querySelector("#gotoSignIn");

signUpEmail.addEventListener('input', validate);  
signUpPassword.addEventListener('input', validate); 
signUpName.addEventListener('input', validate); 

signUpToSignInButton.addEventListener('click', function() {
    popups.signUp.classList.remove('popup_opened');
    popups.signInOpen();
});

signUpForm.addEventListener('submit', function() {
    event.preventDefault();
    signUpExistError.textContent = "";
    signUpButton.textContent = 'Загрузка...';
    mainapi.signUp(signUpName.value, signUpPassword.value, signUpEmail.value)
        .then(res => {
            if(res.message) {
                console.log(res.message)
                signUpExistError.textContent = res.message;
                signUpButton.textContent = 'Зарегистрироваться';
            } else {
                popups.signUp.classList.remove('popup_opened');
                popups.registeredOpen();
                signUpButton.textContent = 'Зарегистрироваться';
                signUpForm.reset();
            }
        })

});

const registeredToSignInButton = document.querySelector("#registeredGotoSignIn");
registeredToSignInButton.addEventListener('click', function() {
    popups.registered.classList.remove('popup_opened');
    popups.signInOpen();
});




function validate(target) {
    target.target.nextElementSibling.classList.add("popup__error-message_hidden");
    if(!target.target.checkValidity()) {
        target.target.nextElementSibling.classList.remove("popup__error-message_hidden");
    }
}

document.addEventListener('click', function() {     
    if (event.target.classList.contains('popup__close')) {
        popups.close(event);
    }
}); 