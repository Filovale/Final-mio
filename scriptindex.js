const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRjNmIwNjY1MDNmNTAwMWE1ODc4OTQiLCJpYXQiOjE3MDg5NDQxMzQsImV4cCI6MTcxMDE1MzczNH0.Yg6KDNvpd3J3xo0xPS2Xl6RVoZZ32TJFFZA5cegEpgA"

let productRow = document.getElementById("products"); 

window.onload = getProducts();

async function getProducts() {
    try {
        let result = await fetch(apiUrl, { headers: {"Authorization": key} });
        let json = await result.json();
        json.forEach(prod => {
            createProducts(prod);
        });        
    } catch (error) {
        console.log(error);
    }
} 

function createProducts ({ name, brand, description, imageUrl, price, _id }) {    

    let productCont = document.createElement("div");
    productCont.classList.add("col-12", "col-sm-6", "col-md-3", "col-lg-3");
    productRow.appendChild(productCont); 

    let productCard = document.createElement("div"); 
    productCard.classList.add("card", "h-100");
    productCont.appendChild(productCard);

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top", "img-fluid");
    cardImage.src = imageUrl;
    productCard.appendChild(cardImage);

    let cardName = document.createElement("div");
    cardName.classList.add("card-body");
    let cardTitle = document.createElement("h5");
    cardTitle.innerText = name;

    let cardBrand = document.createElement("h6");
    cardBrand.innerText = brand;
    let cardPrice = document.createElement("h6");
    cardPrice.innerText = price + " €";

    let cardDescription = document.createElement("p");
    cardDescription.innerText = description;

    let cardLink = document.createElement("a");
    cardLink.classList.add("product-page-link");
    cardLink.innerText = "Details";
    cardLink.href = `/details.html?product=${_id}`;

    productCard.appendChild(cardName);
    cardName.appendChild(cardTitle);
    cardName.appendChild(cardBrand);
    cardName.appendChild(cardPrice);
    cardName.appendChild(cardDescription);
    cardName.appendChild(cardLink);
}