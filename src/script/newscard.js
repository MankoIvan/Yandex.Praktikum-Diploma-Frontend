export default class NewsCard {
    constructor(id, text, image, date, title, description, source, link, keyword) {
        this._id = id;
        this.text = text;
        this.image = image;
        this.date = date;
        this.title = title;
        this.description = description;
        this.source = source;
        this.link = link;
        this.keyword = keyword;
    }
    create(isLoggedIn, bookmark, destroy, key) {
        const card = document.createElement('div');
        card.classList.add('card');
    
        const cardImage = document.createElement('div');
        cardImage.classList.add('card__image');
        cardImage.setAttribute('style', `background-image: url(${this.image})`);
        
        const cardDate = document.createElement('p');
        cardDate.classList.add('card__date');
        cardDate.textContent = new Date(this.date).toLocaleString("ru", { day: "numeric", year: 'numeric', month: 'short' }); 
        
        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card__title');
        cardTitle.textContent = this.title; 
        
        const cardDescription = document.createElement('h4');
        cardDescription.classList.add('card__description');
        cardDescription.textContent = this.description; 
        
        const cardSource = document.createElement('p');
        cardSource.classList.add('card__source');
        cardSource.textContent = this.source;

        card.appendChild(cardImage);
        card.appendChild(cardDate);
        card.appendChild(cardTitle);
        card.appendChild(cardDescription);
        card.appendChild(cardSource);

        if (key) {
            const keyword = document.createElement('div');
            keyword.classList.add('card__keyword');

            const keywordText = document.createElement('p');
            keywordText.classList.add('card__keyword-text');
            keywordText.innerText = this.keyword;
            keyword.appendChild(keywordText);

            card.appendChild(keyword);
        }

        if (destroy) {
            const cardDestroy = document.createElement('div');
            cardDestroy.classList.add('card__delete');

            const cardDestroyImage = document.createElement('span');
            cardDestroyImage.classList.add('card__delete-image');
            cardDestroy.appendChild(cardDestroyImage);
            cardDestroy.addEventListener('click', this.delete.bind(this));

            card.appendChild(cardDestroy);

            /* const cardDestroyTip = document.createElement('div');
            cardDestroyTip.classList.add('card__delete-tip');

            const cardDestroyTipText = document.createElement('p');
            cardDestroyTipText.classList.add('card__delete-tip-text');
            cardDestroyTipText.innerText = "Удалить из сохранённых";
            cardDestroyTip.appendChild(cardDestroyTipText);

            card.appendChild(cardDestroyTip); */
        }
        if (bookmark) {
            const cardBookmark = document.createElement('div');
            cardBookmark.classList.add('card__bookmark');
            cardBookmark.setAttribute('disabled', !isLoggedIn);

            const cardBookmarkImage = document.createElement('span');
            cardBookmarkImage.classList.add('card__bookmark-image');
            cardBookmark.appendChild(cardBookmarkImage);
            cardBookmark.addEventListener('click', this.book.bind(this));

            card.appendChild(cardBookmark);

            if (isLoggedIn) {
                const cardBookmarkTip = document.createElement('div');
                cardBookmarkTip.classList.add('card__delete-tip');
    
                const cardBookmarkTipText = document.createElement('p');
                cardBookmarkTipText.classList.add('card__delete-tip-text');
                cardBookmarkTipText.innerText = "Войдите, чтобы сохранять статьи";
                cardBookmarkTip.appendChild(cardBookmarkTipText);
    
                card.appendChild(cardBookmarkTip);
            }
        }
        return card;

    }
    book() {     
        this.mainApi.createArticle(this.keyword, this.title, this.text, this.date, this.source, this.link, this.image)
            .then(() => {
                this.cardElement.querySelector(".card__bookmark-image").classList.add("card__bookmark-image_marked");
            })
            .catch(res => console.log(res.message));
    }
    delete() {
        this.mainApi.deleteArticle(this._id)
        .then(() => {
            this.cardElement.remove();
        })
        .catch(res => console.log(res.message));
    }
    setMainApi(mainApi) {
        this.mainApi = mainApi;
    }
}