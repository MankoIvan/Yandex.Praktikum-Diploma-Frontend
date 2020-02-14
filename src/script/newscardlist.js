import NewsCard from './newscard.js'
import MainApi from './mainapi.js'

export default class CardList {
    constructor(container) {
        this.container = container;
        this.count = 0;
        this.articlesNumber = 0;
    }
    renderFromSearch(cards, isLoggedIn) {
        this.container.innerHTML = "";
        this.count = 0;
        this.articlesNumber = cards.length;
        this.cards = cards;
        this.renderSomeCards(isLoggedIn);
    }
    renderSomeCards(isLoggedIn) {
        for (let i = this.count; i < this.count + 3; i++) {
            const card = this.cards[i];
            this.addCard(card.urlToImage, card.publishedAt, card.title, card.description, card.source.name, isLoggedIn, true, false)
        }
        this.count = this.count + 3;
    }
    addCard(image, date, title, description, source, isLoggedIn, bookmark, del) {
        const card = new NewsCard(image, date, title, description, source);
        card.cardElement = card.create(isLoggedIn, bookmark, del)
        this.container.appendChild(card.cardElement);
    }
    clearCardList() {
        this.container.innerHTML = "";
        this.count = 0;
        this.articlesNumber = 0;
    }
}
