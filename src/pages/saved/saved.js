import "./saved.css";
import MainApi from "../../script/api/mainapi.js";
import Popup from "../../script/components/popup.js";
import Header from "../../script/components/header.js";
import NewsCardList from "../../script/components/newscardlist.js";

import * as consts from "../../script/consts/consts.js";

const mainApi = new MainApi(consts.MAIN_API_URL);
unAuthRedirect();
const popups = new Popup();
const header = new Header("saved");
const savedCardList = new NewsCardList(document.querySelector(".saved-articles__container"));
savedCardList.setMainApi(mainApi);
renderMenu();

const signInForm = document.forms.signin;
const signInEmail = signInForm.elements.email;
const signInPassword = signInForm.elements.password;
const signInPasswordError = signInForm.querySelector("#wrongPasswordError");
const signInButton = signInForm.querySelector("#signIn");
const signInToSignUpButton = document.querySelector("#gotoSignUp");

const signUpForm = document.forms.signup;
const signUpEmail = signUpForm.elements.email;
const signUpPassword = signUpForm.elements.password;
const signUpName = signUpForm.elements.name;
const signUpExistError = signUpForm.querySelector("#existError");
const signUpButton = signUpForm.querySelector("#signUp");
const signUpToSignInButton = document.querySelector("#gotoSignIn");

const registeredToSignInButton = document.querySelector("#registeredGotoSignIn");

const savedTitle = document.querySelector(".intro__title");
const savedKeywords = document.querySelector(".intro__keywords");

function unAuthRedirect() {
    mainApi.getUser()
        .catch(err => {
            window.location.href = "index.html";
        });
}
function renderMenu() {
    mainApi.getUser()
        .then(res => {
            header.render(true, res.name);
            const unauthButton = document.querySelector("#unauthorize");
            unauthButton.addEventListener('click', function() {
                mainApi.logout()
                    .then(res => {
                        window.location.href = "index.html";
                    })
                    .catch(err => console.log(err));
            }); 
        })
        .catch(err => {
            header.render(false, "");
            const authButton = document.querySelector("#authorize");
            authButton.addEventListener('click', function() {
                header.toggleMenu(header.menu, true);
                popups.signInOpen(event);
            });
        })
};
function validate(target) {
    target.target.nextElementSibling.classList.add("popup__error-message_hidden");
    if(!target.target.checkValidity()) {
        target.target.nextElementSibling.classList.remove("popup__error-message_hidden");
    }
};
function keywordCounter(articles) {
    const keywords = articles.map((item) => item.keyword);
    const countKeywords = keywords.reduce((sum, item) => {
        sum[item] = (sum[item] || 0) + 1;
        return sum;
      }, []);    
    const sortedByPopular = Object.entries(countKeywords).sort((a, b) => b[1] - a[1]);
    const uniqueArray = sortedByPopular.map((item) => item[0]);
    if (uniqueArray.length === 0) {
        return ""
    } else if (uniqueArray.length === 1) {
        return `По ключевому слову: ${uniqueArray[0]}`;
    } else if (uniqueArray.length === 2) {
        return `По ключевым словам: ${uniqueArray[0]} и ${uniqueArray[1]}`;
    } else if (uniqueArray.length === 3) {
        return `По ключевым словам: ${uniqueArray[0]}, ${uniqueArray[1]} и ${uniqueArray[2]}`;
    } else if (uniqueArray.length >= 4) {
        return `По ключевым словам: ${uniqueArray[0]}, ${uniqueArray[1]} и ${uniqueArray.length - 2} другим`;
    }

};
function bindHandlers() {
    signInEmail.addEventListener('input', validate);  
    signInPassword.addEventListener('input', validate); 
    
    signInToSignUpButton.addEventListener('click', function() {
        popups.signIn.classList.remove('popup_opened');
        popups.signUpOpen();
    });
    
    signInForm.addEventListener('submit', function() {
        event.preventDefault();
        signInPasswordError.textContent = "";
        signInButton.textContent = 'Загрузка...';
        mainApi.signIn(signInEmail.value, signInPassword.value)
            .then(res => {
                popups.signIn.classList.remove('popup_opened');
                signInButton.textContent = 'Войти';
                signInForm.reset();
                renderMenu();
            })
            .catch(err => {
                const text = (err === "Ошибка: 401") ? "Неверный email или пароль" : ""
                signInPasswordError.textContent = text;
                signInButton.textContent = 'Войти';
            });
    });
    
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
                popups.signUp.classList.remove('popup_opened');
                popups.registeredOpen();
                signUpButton.textContent = 'Зарегистрироваться';
                signUpForm.reset();
            })
            .catch(err => {
                const text = (err === "Ошибка: 409") ? "Пользователь с таким email уже существует" : ""
                signUpExistError.textContent = text;
                signUpButton.textContent = 'Зарегистрироваться';
            })
    });
    registeredToSignInButton.addEventListener('click', function() {
        popups.registered.classList.remove('popup_opened');
        popups.signInOpen();
    });
    
    document.addEventListener('click', function() {     
        if (event.target.classList.contains('popup__close')) {
            popups.close(event);
        }
    });
};
function renderIntro() {
   mainApi.getUser()
       .then(name => {
           mainApi.getArticles()
               .then(res => {
                   savedTitle.innerText = `${name.name}, у вас ${res.length} сохраненных статей`;
                   savedKeywords.innerText = keywordCounter(res);
                   savedCardList.renderSaved(res);
                   keywordCounter(res);
               })
               .catch(err => console.log(err))
       })
       .catch(err => console.log(err));
};
renderIntro()
bindHandlers();



