export class CatApiInterface{
    constructor(apiKey, rootElement){
        this.apiKey = apiKey;
        this.rootElement = rootElement;
    }

    async getRandomCats(limit){
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=${this.apiKey}`);
        const data = await response.json();
        this.renderCarts(data, this.rootElement);
    } 

    async getFavoritesCats(limit){
        const response = await fetch(`https://api.thecatapi.com/v1/favourites?api_key=${this.apiKey}`);
        const data = await response.json();
        console.log(data)
        this.renderCarts(data, this.rootElement)
    } 

    async addFavoriteCat(body, apiKey){

        const newFavourite = await fetch(
            `https://api.thecatapi.com/v1/favourites?api_key=${apiKey}`, 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'} ,
                    body: body
                }
            )    
    } 

    async deleteFavorites (id, apiKey){
       
        const newFavorite = await fetch(
            `https://api.thecatapi.com/v1/favourites/${id}?api_key=${apiKey}`, 
                {
                    method: 'DELETE',
                }
            )
    }
    
    async renderCarts(data, rootElement){

        const elements = data.map(elem => {
            const imageUrl = elem.url? elem.url : elem.image.url
            const isliked = elem.created_at && "heart-icon-liked" ;
            const cart = this.createCatCart(elem.id, imageUrl, isliked);
    
            return cart
        })
        rootElement.innerHTML = ''
        rootElement.append(...elements)
    }

    createElement (tag, attributes, ...childElement){
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

    createCatCart(catId, url, favorite){
        const classFavoriteIcon = favorite ? favorite : "heart-icon";
        const isLiked = favorite ? true : false;

        const img =  new Image();
        img.src = `${url}`;
        const span = this.createElement("span", {class: "card-icon", catId: catId});
        span.classList.add(classFavoriteIcon);
        const likeIcon = this.createElement("div", {class: "card-icon-container"}, span);
        const cart = this.createElement("li", {class: catId}, img, likeIcon);
        
          //listener
          likeIcon.addEventListener("click", async (e)=>{
            /* let isClicked = span.getAttribute('isClick') === 'false' ? false : true; */
            
            span.classList.toggle("heart-icon");
            span.classList.toggle("heart-icon-liked");
            
            const idBody = e.target.getAttribute("catId")
            const rawBody = JSON.stringify({ 
                image_id: idBody,
                 });
            
            if(!isLiked){
                this.addFavoriteCat(rawBody, this.apiKey)
                cart.remove()
                
            }
            else{
                this.deleteFavorites(idBody, this.apiKey);
                cart.remove()
            }

        })
    
        return cart
    }

    async upLoadImage(){
        const form = document.getElementById('form-data')
        const formData = new FormData(form);
        
        const res = await fetch('https://api.thecatapi.com/v1/images/upload', {
            method: 'POST',
            headers:{ /* 'Content-Type': 'multipart/form-data' */
            'X-API-KEY': this.apiKey
            },
            body: formData
        })
    }
    
}


