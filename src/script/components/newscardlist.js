import NewsCard from './newscard.js'

export default class CardList {
    constructor(container) {
        this.container = container;
        this.count = 0;
        this.articlesNumber = 0;
    }
    renderFromSearch(cards, keyword, isLoggedIn) {
        this.keyword = keyword;
        while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
        this.count = 0;
        this.articlesNumber = cards.length;
        this.cards = cards;
        this.renderSomeCards(isLoggedIn);
    }
    renderSomeCards(isLoggedIn) {
        document.querySelector(".result__exist-button").classList.remove("result__exist-button_invisible")
        for (let i = this.count; i < this.count + 3; i++) {
            if (i >= this.articlesNumber) {
                document.querySelector(".result__exist-button").classList.add("result__exist-button_invisible")
                if (i = this.articlesNumber) {
                    return;
                }
            }
            const card = this.cards[i];
            this._addCard("", card.content, card.urlToImage, card.publishedAt, card.title, card.description, card.source.name, card.url, this.keyword, isLoggedIn, true, false, false);
        }
        this.count = this.count + 3;
    }
    renderSaved(cards) {
        for (let card of cards) {
            this._addCard(card._id, "", card.image, card.date, card.title, card.text, card.source, card.link, card.keyword, true, false, true, true)
        }
    }
    _addCard(id, text, image, date, title, description, source, link, keyword, isLoggedIn, bookmark, del, key) {
        const card = new NewsCard(id, text, image, date, title, description, source, link, keyword);
        card.setMainApi(this.mainApi);
        card.cardElement = card.create(isLoggedIn, bookmark, del, keyword)
        this.container.appendChild(card.cardElement);
    }
    clearCardList() {
        while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
        this.count = 0;
        this.articlesNumber = 0;
    }
    setMainApi(mainApi) {
        this.mainApi = mainApi;
    }
}
