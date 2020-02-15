import "./index.css";
import MainApi from "../../script/mainapi.js";
import NewsApi from "../../script/newsapi.js"
import Popup from "../../script/popup.js";
import Header from "../../script/header.js";
import NewsCardList from "../../script/newscardlist.js";

import * as consts from "../../script/consts.js";

const mainApi = new MainApi(consts.MAIN_API_URL);
const newsApi = new NewsApi(consts.NEWS_API_PARAMETERS);
const popups = new Popup();
const header = new Header("index");
const newsCardList = new NewsCardList(document.querySelector(".result__exist-container"));
newsCardList.setMainApi(mainApi);
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

const searchForm = document.forms.search;
const searchInput = searchForm.elements.searchWord;
const searchButton = searchForm.elements.searchButton;
const resultContainer = document.querySelector(".result");
const resultNothing = resultContainer.querySelector(".result__nothing")
const resultExist = resultContainer.querySelector(".result__exist")
const reslutLoading = resultContainer.querySelector(".result__loading")

const showMoreButton = resultExist.querySelector("#showMore");


function validate(target) {
    target.target.nextElementSibling.classList.add("popup__error-message_hidden");
    if(!target.target.checkValidity()) {
        target.target.nextElementSibling.classList.remove("popup__error-message_hidden");
    }
};
function renderMenu() {
    mainApi.getUser()
        .then(res => {
            header.render(true, res.name);
            const unauthButton = document.querySelector("#unauthorize");
            unauthButton.addEventListener('click', function() {
                header.toggleMenu(header.menu, false);
                mainApi.logout();
                header.render(false, "");
                const authButton = document.querySelector("#authorize");
                authButton.addEventListener('click', function() {
                    popups.signInOpen(event);
                });
                resultContainer.classList.remove("result_opened");
                newsCardList.clearCardList();
                searchForm.reset();
            }); 
        })
        .catch(err => {
            header.render(false, "");
            const authButton = document.querySelector("#authorize");
            authButton.addEventListener('click', function() {
                header.toggleMenu(header.menu, false);
                popups.signInOpen(event);
            });
        })
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
    
    searchInput.addEventListener('input', function() {
        if (!event.target.checkValidity()) {
            searchButton.setAttribute('disabled', true);
        } else {
            searchButton.removeAttribute('disabled');
        }
    });
    
    searchForm.addEventListener('submit', function() {
        event.preventDefault();
        resultContainer.classList.add("result_opened");
        resultNothing.classList.remove("result__nothing_opened");
        resultExist.classList.remove("result__exist_opened");
        reslutLoading.classList.add("result__loading_opened");
        const time = new Date(Date.now() - consts.WEEK_IN_MS);
        newsApi.getNews(searchInput.value, time)
            .then(res => {
                if (res.articles.length) {
                    mainApi.getUser()
                        .then(res1 => {
                            newsCardList.renderFromSearch(res.articles, searchInput.value, res1.message);
                            reslutLoading.classList.remove("result__loading_opened");
                            resultExist.classList.add("result__exist_opened");
                        })
                } else {
                    newsCardList.clearCardList()
                    reslutLoading.classList.remove("result__loading_opened");
                    resultNothing.classList.add("result__nothing_opened");
    
                }
            });
    });
    
    showMoreButton.addEventListener('click', function() {
        mainApi.getUser()
        .then(res => {
            newsCardList.renderSomeCards(res.message);
        })
    });
    
    document.addEventListener('click', function() {     
        if (event.target.classList.contains('popup__close')) {
            popups.close(event);
        }
    }); 
};
bindHandlers();

