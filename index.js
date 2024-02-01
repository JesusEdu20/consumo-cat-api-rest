
import { CatApiInterface } from "./CatApiInterface.js";

const API_KEY = 'live_hqLqbLvMpTZllarOI3tKRlsRKzCUPj954lBlKcYKScqpGd41FZgQ8UVRJlp2O2rY'
const app = document.querySelector(".app");
const cartContainer = document.querySelector(".cart-container");


const favBtn = document.querySelector(".favorites__button");
const randomBtn = document.querySelector(".random__button");

const catInterface = new CatApiInterface(API_KEY, cartContainer); 

const formData = new FormData()

//EVENTS
randomBtn.addEventListener("click", () => {
    catInterface.getRamdomCats(10);
})

favBtn.addEventListener("click", () => {
    catInterface.getFavoritesCats(10);
})


//Init
catInterface.getRamdomCats(10);



