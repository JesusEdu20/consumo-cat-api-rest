
const API_KEY = 'live_hqLqbLvMpTZllarOI3tKRlsRKzCUPj954lBlKcYKScqpGd41FZgQ8UVRJlp2O2rY'
const app = document.querySelector(".app");
const cartContainer = document.querySelector(".cart-container");

async function addFavoriteCat(body, apiKey){

    const newFavourite = await fetch(
        `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'} ,
                body: body
            }
        )
        console.log(newFavourite)
} 

function createElement (tag, attributes, ...childElement){
    const elem = document.createElement(`${tag}`);
    
    if(attributes){
        for(const attribute in attributes){
            if(attribute !== "class"){
                
                elem.setAttribute(attribute, attributes[attribute])
            }
            else {
                elem.classList.add(attributes[attribute])
            }
        }
    }
    
    if(childElement){
        childElement.forEach(child => elem.appendChild(child))
    }
    
    return elem
}

function createCatCart(catId, url, favorite){
    const likeStatus = favorite ? favorite : "heart-icon"; 
    const img =  new Image();
    img.src = `${url}`;
    const span = createElement("span", {class: "card-icon", catId: catId});
    span.classList.add(likeStatus);
    const likeIcon = createElement("div", {class: "card-icon-container"}, span);
    const cart = createElement("li", {class: catId}, img, likeIcon);


      //listener
      likeIcon.addEventListener("click", async (e)=>{
        span.classList.toggle("heart-icon");
        span.classList.toggle("heart-icon-liked");
        
        const idBody = e.target.getAttribute("catId")
        console.log(e.target)
        const rawBody = JSON.stringify({ 
            image_id: idBody,
             });
        addFavoriteCat(rawBody, API_KEY)    
    })

    return cart
}

async function renderCarts(data, rootElement){

    const elements = data.map(elem => {
        const imageUrl = elem.url? elem.url : elem.image.url
        const isliked = elem.created_at && "heart-icon-liked" ;
        const cart = createCatCart(elem.id, imageUrl, isliked);

        return cart
    })
    rootElement.innerHTML = ''
    rootElement.append(...elements)
}


async function getRamdomCats(limit, apiKey){
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=${apiKey}`);
    const data = await response.json();
    console.log(data)
    renderCarts(data, cartContainer)
}   


async function getFavoritesCats(limit, apiKey){
    const response = await fetch(`https://api.thecatapi.com/v1/favourites?api_key=${apiKey}`);
    const data = await response.json();
    console.log(data)
    renderCarts(data, cartContainer)
} 



getRamdomCats(10, API_KEY);



const favBtn = document.querySelector(".favorites__button");
const randomBtn = document.querySelector(".random__button");
const like = document.querySelector(".card-icon-container");
const heartIcon = document.querySelector(".card-icon");


randomBtn.addEventListener("click", () => {
    getRamdomCats(10, API_KEY);
})

favBtn.addEventListener("click", () => {
    getFavoritesCats(10, API_KEY);
})





/* const test = createElement("h1", null, null, {class: "test-create"}) */


