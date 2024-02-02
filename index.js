
import { CatApiInterface } from "./CatApiInterface.js";

const API_KEY = 'live_hqLqbLvMpTZllarOI3tKRlsRKzCUPj954lBlKcYKScqpGd41FZgQ8UVRJlp2O2rY'
const app = document.querySelector(".app");
const cartContainer = document.querySelector(".cart-container");
const sendButton = document.getElementById('form-data-send-button');
const favBtn = document.querySelector(".favorites__button");
const randomBtn = document.querySelector(".random__button");

const catInterface = new CatApiInterface(API_KEY, cartContainer); 

function initialCatDisplay(){
    
    if(window.localStorage.getItem('view')==='random'){
        catInterface.getRandomCats(10);
        randomBtn.style.backgroundColor = '#111111'
    }
    else{
        catInterface.getFavoritesCats(10);
        favBtn.style.backgroundColor = '#111111';
    }
    
}


//EVENTS
randomBtn.addEventListener("click", () => {
    catInterface.getRandomCats(10);
    window.localStorage.setItem('view', 'random')
    randomBtn.style.backgroundColor = '#111111'
    favBtn.style.backgroundColor = 'rgb(45, 47, 49)'
})

favBtn.addEventListener("click", () => {
    catInterface.getFavoritesCats(10);
    window.localStorage.setItem('view', 'favorite')
    favBtn.style.backgroundColor = '#111111';
    randomBtn.style.backgroundColor = 'rgb(45, 47, 49)'
})

/* sendButton.addEventListener("click", (event)=>{
    event.preventDefault()
    catInterface.upLoadImage()
}) */

//Init

initialCatDisplay()

