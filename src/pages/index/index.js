import "./index.css";
import MainApi from "../../script/mainapi.js";
import NewsApi from "../../script/newsapi.js"
import Popup from "../../script/popup.js";
import Header from "../../script/header.js";
import NewsCardList from "../../script/newscardlist.js";

const serverUrl = 'http://localhost:3000';

const mainApi = new MainApi({baseUrl: serverUrl});
const newsApi = new NewsApi();
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
                header.render(false, "");
                resultContainer.classList.remove("result_opened");
                newsCardList.clearCardList();
                searchForm.reset();
            }); 
        });
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
        newsApi.getNews(searchInput.value)
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


