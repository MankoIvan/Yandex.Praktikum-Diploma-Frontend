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
console.log(popups)

const authButton = document.querySelector("#authorize");

const signInForm = document.forms.signin;

const signInEmail = signInForm.elements.email;
const signInPassword = signInForm.elements.password;

const signInPasswordError = signInForm.querySelector("#wrongPasswordError");

const signInButton = signInForm.querySelector("#signIn");

const SignInToSignUpButton = document.querySelector("#gotoSignUp");
const SignUpToSignInButton = document.querySelector("#gotoSignIn");
console.log(SignUpToSignInButton)





const signUpForm = document.forms.signup;



const signUpEmailError = signUpForm.querySelector("#emailError")
const signUpPasswordError = signUpForm.querySelector("#passwordError")
const signUpNameError = signUpForm.querySelector("#nameError")
const signUpExistError = signUpForm.querySelector("#existError")


function validate(target) {
    target.target.nextElementSibling.classList.add("popup__error-message_hidden");
    console.log(target);
    console.log(target.target.nextElementSibling)
    if(!target.target.checkValidity()) {
        target.target.nextElementSibling.classList.remove("popup__error-message_hidden");
    }
}

document.addEventListener('click', function() {     
    if (event.target.classList.contains('popup__close')) {
        popups.close(event);
    }
});
authButton.addEventListener('click', function() {
    popups.signInOpen(event);
});
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
signInEmail.addEventListener('input', validate);  
signInPassword.addEventListener('input', validate);  
SignInToSignUpButton.addEventListener('click', function() {
    popups.signIn.classList.remove('popup_opened');
    popups.signUpOpen();
})
SignUpToSignInButton.addEventListener('click', function() {
    popups.signUp.classList.remove('popup_opened');
    popups.signInOpen();
})