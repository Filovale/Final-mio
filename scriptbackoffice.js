// URL & KEY
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRjNmIwNjY1MDNmNTAwMWE1ODc4OTQiLCJpYXQiOjE3MDg5NDQxMzQsImV4cCI6MTcxMDE1MzczNH0.Yg6KDNvpd3J3xo0xPS2Xl6RVoZZ32TJFFZA5cegEpgA"

//prodotti già inseriti:
window.onload = getProducts();

//* POST button:
const newProductBtn = document.getElementById("saveNewProduct");
newProductBtn.onclick= newProduct;

//* funz x creare nuovo prod:
function newProduct () {
    let newProduct = {
        "name": `${inputName.value}`, 
        "brand": `${inputBrand.value}`,
        "description": `${inputDescription.value}`,
        "imageUrl": `${inputImage.value}`,
        "price": inputPrice.value
    };
        
    postProduct(newProduct);
}


//* fetch CREATE:
async function postProduct (newProduct) {
    try {
        let addedProd = await fetch(apiUrl, 
            { method: "POST", headers: {"Content-type": "application/json; charset=UTF-8","Authorization": key}, body: JSON.stringify(newProduct) });
            getProducts();
        if (addedProd && newProduct) {
            setTimeout(() => {
                alertOk.classList.toggle("d-none");
            }, 3000);
        };
    } catch (error) {
        console.log(error)
    }
}

//* fetch READ:
async function getProducts() {
        try {
            let result = await fetch(apiUrl, { headers: {"Authorization": key} });
            let json = await result.json();
            json.forEach(prod => {
                createTable(prod); 
            });
        } catch (error) {
            console.log(error);
        }
}


//* fetch UPDATE: 
async function putProducts (prod, inputToModify) {
    try {
        await fetch(apiUrl + prod._id, 
            { method: "PUT", headers: {"Content-type": "application/json; charset=UTF-8", "Authorization": key}, body: JSON.stringify(inputToModify)});
            productsList.innerHTML = "";
            getProducts();
    } catch (error) {
        console.log(error)
    }
}

//* fetch DELETE: 
async function deleteProduct (prod) {
    try {
        await fetch(apiUrl + prod._id, 
            { method: "DELETE", headers: { "Authorization": key}});
            productsList.innerHTML = "";
            getProducts();
    } catch (error) {
        console.log(error)
    }
}

const productsList = document.getElementById("productsList");
function createTable(prod) {

    let productLi = document.createElement("li");
    productLi.classList.add("list-group-item" , "my-5");
    productsList.appendChild(productLi);

    let productName = document.createElement("span");
    productName.innerText = `${prod.name}`;
    productLi.appendChild(productName);
  
    let divModify = document.createElement("div");
    let modifyHeader = document.createElement("h6");
    modifyHeader.innerText = "Modify product:";
    divModify.appendChild(modifyHeader);
    // Definizione delle placeholder
    const placeholders = ['name', 'brand', 'description', 'image url', 'price'];
    // Creazione di input per la modifica
        for (let i = 0; i < 5; i++) {
            let input = document.createElement("input");
            input.type = "text";
            let inputModify = input.value;
            // Aggiunta della placeholder all'input
            input.placeholder = placeholders[i];    
            divModify.appendChild(input); 
        };

    productLi.appendChild(divModify)
    divModify.classList.add("modify")

    let buttonBlue = document.createElement("button");
    buttonBlue.classList.add("blue-button");
    buttonBlue.innerText = "Modify"
    productLi.appendChild(buttonBlue);

    let buttonRed = document.createElement("button");
    buttonRed.classList.add("red-button");
    buttonRed.innerText = "Delete"
    productLi.appendChild(buttonRed);

    buttonRed.addEventListener("click", () => {
        deleteProduct(prod);
    });

    buttonBlue.addEventListener("click" , () => {
 
        //non sono riusscito a implementare la parte per modificarlo

    });

}
