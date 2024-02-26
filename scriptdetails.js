
let urlProduct = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRjNmIwNjY1MDNmNTAwMWE1ODc4OTQiLCJpYXQiOjE3MDg5NDQxMzQsImV4cCI6MTcxMDE1MzczNH0.Yg6KDNvpd3J3xo0xPS2Xl6RVoZZ32TJFFZA5cegEpgA"

let activeParams = window.location.search; 

let params = new URLSearchParams(activeParams);
let productId = params.get("product");

let productDetails;

window.onload = getProducts();

async function getProducts() {
    try {
        let result = await fetch(`${urlProduct}${productId}`,  { headers: {"Authorization": key} });
        let json = await result.json();
        console.log(json);
        moreDetails(json);        
    } catch (error) {
        console.log(error)
    }
};

function moreDetails({ name, brand, description, imageUrl, price}) {
    let imageBox = document.getElementById("productImage");

    let productImage = document.createElement("img");
    productImage.classList.add("w-100");
    productImage.src = imageUrl;
    imageBox.appendChild(productImage);

    let productName = document.querySelector("h4");
    productName.innerText = name;

    let productBrand = document.querySelector("h5");
    productBrand.innerText = brand;

    let productPrice = document.querySelector("h6");
    productPrice.innerText = price + " euro";

    let productDescription = document.querySelector("p");
    productDescription.innerText = description;

}