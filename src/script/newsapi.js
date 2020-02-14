export default class NewsApi {
    constructor() {
        this.url = "http://newsapi.org/v2/everything?";
        this.apiKey = "fa01878ef86944b3b9eae4c12b3f9447"
    }
    getNews(theme) {
        let time = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
        
        return fetch(`${this.url}q=${theme}&from=${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}&sortBy=publishedAt&pageSize=100&apiKey=${this.apiKey}`)
            .then(res => res.json())
    }
}


/* fa01878ef86944b3b9eae4c12b3f9447 */
/* fetch("http://newsapi.org/v2/everything?q=Природа&from=2020-01-11&sortBy=publishedAt&pageSize=100&apiKey=fa01878ef86944b3b9eae4c12b3f9447")
    .then(res => res.json())
    .then(res => console.log(res)); */