//VARIABLES AND LISTS---------------------------------------------------------------
const hamburgerBTN = document.querySelector(".fa-bars");
const  toggleBTN = document.querySelector(".fa-times");
const navList = document.querySelector(".nav-list");
const juiceSelector1 = document.querySelector("#tastes1");
const juiceSelector2 = document.querySelector("#tastes2");
const fruitSelector = document.querySelector("#fruits");
const spiceSelector = document.querySelector("#spices");
const generatedJuice = document.querySelector(".generatedImage");
const addBtn = document.querySelector("#btn-add");
const orderList = document.querySelector(".order-list");
let priceTag = document.querySelector(".price-tag");

let juiceOptions1 = ["orange", "apple", "raspberry"];
let juiceOptions2 = ["orange", "apple", "raspberry"];
let fruitOptions = ["Kiwi", "Lemon"];
let spiceOptions = ["Cinnamon", "Vannila"];


let cart = [];
let itemsCreated = [];

//CLASSES and objects
class Juice {
    constructor(name, price, image, count, added) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.count = count;
        this.added = false;
    }
}



let finishedJuices = {
    appleJuice: new Juice("Apple Juice", 60, "images/custom_apple_apple.png", 0),
    orangeJuice: new Juice("Orange Juice", 60, "images/custom_orange_orange.png", 0),
    raspberryJuice: new Juice("Raspberry Juice", 60, "images/custom_raspberry_raspberry.pngg", 0),
    orangerasberyJuice: new Juice("Orange Raspberry Juice", 60, "images/custom_orange_raspberry.png", 0),
    orangeappleJuice: new Juice("Orange Apple Juice", 60, "images/custom_orange_apple.png", 0),
    appleraspberryJuice: new Juice("Apple Raspberry Juice", 60, "images/custom_raspberry_apple.png", 0)
}

let shoppingCart = {
    itemList : [],
    sum: 0,
    amount: 0,
    calculate: function() {
        for (let i in this.itemList) {
            this.sum += 60;
        }
    }
}

function makeCartList() {
        for (let item in finishedJuices) {
                shoppingCart.itemList.push((finishedJuices[item]));
    }
}


//HERO---------------------------------------------------------------
//listeners
hamburgerBTN.addEventListener("click", function() {
    toggleBTN.classList.add("open");
    hamburgerBTN.classList.add("open");
    navList.classList.add("open");
})

toggleBTN.addEventListener("click", function() {
    toggleBTN.classList.remove("open");
    hamburgerBTN.classList.remove("open");
    navList.classList.remove("open");
})

function cartAmount() {
    
}




//JUICE GENERATOR---------------------------------------------------------------
//listeners
juiceSelector1.addEventListener("change", generateJuice);
juiceSelector2.addEventListener("change", generateJuice);
addBtn.addEventListener("click", addJuice)
addBtn.addEventListener("click", displayItem)
addBtn.addEventListener("click", generatePrice)
addBtn.addEventListener("mouseover", () =>{
    orderList.style.opacity = "0.5";
});
addBtn.addEventListener("mouseout", () =>{
    orderList.style.opacity = "0";
});


//functions
function optionCreator(list, selected) {
    for (let i = 0; i < list.length; i++) {
        let option = document.createElement("OPTION");
        option.value = list[i];
        option.innerHTML = list[i];
        selected.appendChild(option);
    }
}

function generateJuice(juice1, juice2, fruit, spice) {
    if (juiceSelector1.value === juiceSelector2.value) {
    generatedJuice.src=finishedJuices[(juiceSelector1.value + "Juice")].image
}
    if(juiceSelector1.value !== juiceSelector2.value) {
        generatedJuice.src=finishedJuices[(juiceSelector1.value + juiceSelector2.value + "Juice")].image
        generatedJuice.src=finishedJuices[(juiceSelector2.value + juiceSelector1.value + "Juice")].image
    }

}

function addJuice(name) {
    if (juiceSelector1.value === juiceSelector2.value){
        finishedJuices[juiceSelector1.value + "Juice"].count +=1;
    }
    else {
        if (finishedJuices.hasOwnProperty(juiceSelector1.value + juiceSelector2.value + "Juice")) {
            finishedJuices[juiceSelector1.value + juiceSelector2.value + "Juice"].count +=1;
        }
        else {
            finishedJuices[juiceSelector2.value + juiceSelector1.value + "Juice"].count +=1;
        }    
    }
}

function displayItem() {
    Object.keys(finishedJuices).forEach(key => { 
        const itemDiv = document.createElement("div")
        if (finishedJuices[key].count > 0 && finishedJuices[key].added === false){
            finishedJuices[key].added = true;
            itemDiv.innerHTML = finishedJuices[key].name;
            orderList.appendChild(itemDiv)
           }
})
}

function generatePrice() {
    let price = 0
    Object.keys(finishedJuices).forEach(key => {
        
        price += Number(finishedJuices[key].count) * Number(finishedJuices[key].price)
        priceTag.innerHTML = "Price: " + price;

    })
}




//SETUP---------------------------------------------------------------
optionCreator(juiceOptions1, juiceSelector1);
optionCreator(juiceOptions2, juiceSelector2);
optionCreator(fruitOptions, fruitSelector);
optionCreator(spiceOptions, spiceSelector);
makeCartList();
generateJuice();
