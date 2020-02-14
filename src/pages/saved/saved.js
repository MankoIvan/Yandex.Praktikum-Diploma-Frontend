import "./saved.css";

const serverUrl = 'http://localhost:3000';

import MainApi from "../../script/mainapi.js";
import NewsApi from "../../script/newsapi.js"
import Popup from "../../script/popup.js";
import Header from "../../script/header.js";
import NewsCardList from "../../script/newscardlist.js";

const mainApi = new MainApi({baseUrl: serverUrl});
const newsApi = new NewsApi();
const popups = new Popup();
const header = new Header("saved");
const newsCardList = new NewsCardList(document.querySelector(".result__exist-container"));
renderMenu();

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
    mainApi.signIn(signInEmail.value, signInPassword.value)
        .then(res => {
            if(res.message) {
                console.log(res.message)
                signInPasswordError.textContent = res.message;
                signInButton.textContent = 'Войти';
            } else {
                popups.signIn.classList.remove('popup_opened');
                signInButton.textContent = 'Войти';
                signInForm.reset();
                renderMenu();
            }
        })
});

const signUpForm = document.forms.signup;
const signUpEmail = signUpForm.elements.email;
const signUpPassword = signUpForm.elements.password;
const signUpName = signUpForm.elements.name;
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
    mainApi.signUp(signUpName.value, signUpPassword.value, signUpEmail.value)
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

document.addEventListener('click', function() {     
    if (event.target.classList.contains('popup__close')) {
        popups.close(event);
    }
}); 


function renderMenu() {
    mainApi.getUser()
        .then(res => {
            if(res.message) {
                header.render(false, "");
                return Promise.resolve();
            } else {
                header.render(true, res.name);
                return Promise.reject();
            }
        })
        .then(() => {
            const authButton = document.querySelector("#authorize");
            authButton.addEventListener('click', function() {
                popups.signInOpen(event);
            });
        })
        .catch(() => {
            const unauthButton = document.querySelector("#unauthorize");
            unauthButton.addEventListener('click', function() {
                mainApi.logout();
                window.location.href = "index.html";
                /* 
                resultContainer.classList.remove("result_opened");
                newsCardList.clearCardList();
                searchForm.reset(); */
            }); 
        });
}

function validate(target) {
    target.target.nextElementSibling.classList.add("popup__error-message_hidden");
    if(!target.target.checkValidity()) {
        target.target.nextElementSibling.classList.remove("popup__error-message_hidden");
    }
}