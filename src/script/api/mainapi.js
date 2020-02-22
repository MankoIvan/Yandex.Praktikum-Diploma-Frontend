export default class MainApi {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    signUp(name, password, email) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                password: password,
                email: email,
            })
        })
        .then(res => this._checkStatus(res)) 
    }
    signIn(email, password) {
        return fetch(`${this.url}/signin`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: email,
            })
        })
        .then(res => this._checkStatus(res)) 
    }
    logout() {
        return fetch(`${this.url}/logout`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`); 
            }
            return
        })

    }
    getUser() {
        return fetch(`${this.url}/users/me`, {
            credentials: 'include',
            method: 'GET',
        })
        .then(res => this._checkStatus(res)) 
    }
    getArticles() {
        return fetch(`${this.url}/articles`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(res => this._checkStatus(res)) 
    }
    createArticle(keyword, title, text, date, source, link, image) {
        return fetch(`${this.url}/articles`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
            keyword: keyword,
            title: title,
            text: text,
            date: date,
            source: source,
            link: link,
            image: image,
            })
        })
        .then(res => this._checkStatus(res)) 
    }
    deleteArticle(articleId) {
        return fetch(`${this.url}/articles/${articleId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => this._checkStatus(res)) 
    }
    _checkStatus(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

}