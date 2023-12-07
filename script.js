const API_KEY = "pub_34342a58598a8e0741624297023535766908c";
const url = "https://newsdata.io/api/1/news?apikey=pub_34342a58598a8e0741624297023535766908c&q=";

window.addEventListener("load",() => fetchNews("pizza"));

async function fetchNews(query){
    const res= await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsSource = cardClone.querySelector('#news-source');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsDesc.innerHTML=  article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-Us",{
        timeZone: "Asia/Jakarta"
    });
     newsSource.innerHTML = `${article.source.name} ${date}`;

     cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"blank");
     })
    }

     function onNavItemClick(id){
        fetchNews(id);
     }
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",() => {
    const query = searchText.value;
    if(!query)return;
    fetchNews(query);
});
function reload(){
    window.location.reload();
}