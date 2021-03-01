//VARIABLES, LISTS, OBJECTS---------------------------------------------------------------
const hamburgerBTN = document.querySelector(".fa-bars");
const  toggleBTN = document.querySelector(".fa-times");
const navList = document.querySelector(".nav-list");
const paralax = document.getElementById("paralax")
const juiceSelector1 = document.querySelector("#tastes1");
const juiceSelector2 = document.querySelector("#tastes2");
const generatedJuice = document.querySelector(".generatedImage");
const addBtn = document.querySelector("#btn-add");
const orderList = document.querySelector(".order-list");
let priceTag = document.querySelector(".price-tag");
let cartAmount = document.querySelector(".item-amount")
const presetContainer = document.querySelector(".preset-container")

//juice options
let juiceOptions1 = ["orange", "apple", "raspberry"];
let juiceOptions2 = ["orange", "apple", "raspberry"];

//animations function
$(function () {
    AOS.init({
            easing: "ease",
            duration: 1000,
        });
});

//CLASSES and objects
class Juice {
    constructor(name, price, image, count, added, className) {
        //for selection key in class is used
        //name used for display 
        this.name = name;
        this.price = price;
        this.image = image;
        this.count = count;
        this.added = added;
        //class needed for order-list, because we cannot get class from name
        this.className = className;
    }
}

class Preset {
    constructor(name, price, image, count, added, className, author) {
        //for selection key in class is used
        //name used for display 
        this.name = name;
        this.price = price;
        this.image = image;
        this.count = count;
        this.added = added;
        //class needed for order-list, because we cannot get class from name
        this.className = className;
        this.author = author;
    }
}

let finishedJuices = {
    appleJuice: new Juice("Apple Juice", 60, "/public/images/custom_apple_apple.png", 0, false, "apple-juice"),
    orangeJuice: new Juice("Orange Juice", 60, "/public/images/custom_orange_orange.png", 0, false, "orange-juice"),
    raspberryJuice: new Juice("Raspberry Juice", 60, "/public/images/custom_raspberry_raspberry.png", 0, false, "raspberry-juice"),
    orangeraspberryJuice: new Juice("Orange Raspberry Juice", 60, "/public/images/custom_orange_raspberry.png", 0, false, "orangeRaspberry-juice"),
    orangeappleJuice: new Juice("Orange Apple Juice", 60, "/public/images/custom_orange_apple.png", 0, false, "orangeApple-juice"),
    appleraspberryJuice: new Juice("Apple Raspberry Juice", 60, "/public/images/custom_raspberry_apple.png", 0, false, "appleraspberry-juice"),   
}

let presets = {
    tomatoJuice: new Preset("Tomato Special", 120, "/public/images/tomato.png", 0, false, "/public/images/tomato.png", "Jaroslav8"),
    tomatoJuice2: new Preset("Tomato Special", 120, "/public/images/tomato.png", 0, false, "/public/images/tomato.png", "Jaroslav8"),
    tomatoJuice3: new Preset("Tomato Special", 120, "/public/images/tomato.png", 0, false, "/public/images/tomato.png", "Jaroslav8")
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




//WINDOW---------------------------------------------------------------
window.addEventListener("scroll", function(){
    let offset = window.pageYOffset;
    paralax.style.backgroundPositionY = offset * 0.7 + "px";
})




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
addBtn.addEventListener("click", generateCartIcon)


//functions
function optionCreator(list, selected) {
    for (let i = 0; i < list.length; i++) {
        let option = document.createElement("OPTION");
        option.value = list[i];
        option.innerHTML = list[i];
        selected.appendChild(option);
    }
}

function generateJuice() {
    if (juiceSelector1.value === juiceSelector2.value) {
    generatedJuice.src=finishedJuices[(juiceSelector1.value + "Juice")].image
}
    if(juiceSelector1.value !== juiceSelector2.value) {
        try {
            generatedJuice.src=finishedJuices[(juiceSelector1.value + juiceSelector2.value + "Juice")].image
          }
          catch(err) {
            generatedJuice.src=finishedJuices[(juiceSelector2.value + juiceSelector1.value + "Juice")].image
            console.log(finishedJuices[(juiceSelector2.value + juiceSelector1.value + "Juice")])
          }        
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
        const image = document.createElement("img")
        const count = document.createElement("span")
        if (finishedJuices[key].count > 0 && finishedJuices[key].added === false){
            finishedJuices[key].added = true;
            itemDiv.innerHTML = finishedJuices[key].name;
            itemDiv.classList.add(finishedJuices[key].className)
            image.src = finishedJuices[key].image
            image.classList.add("juice-image")
            count.classList.add("count-tag")
            count.classList.add(finishedJuices[key].className + "-count")
            itemDiv.appendChild(image)
            itemDiv.appendChild(count)
            orderList.appendChild(itemDiv)
           }
        if (finishedJuices[key].added === true) {
            // itemDiv.childNodes[2].innerHTML = finishedJuices[key].count;
            document.querySelector("." + finishedJuices[key].className + "-count").innerHTML = finishedJuices[key].count;
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

function generateCartIcon() {
    amount = 0;
    Object.keys(finishedJuices).forEach(key => {
        amount += Number(finishedJuices[key].count);
        cartAmount.innerHTML = amount;
    })
}

function loadPreset() {
    for (let i = 0; i < 3; i++  ) {
        let itemKey = Object.keys(presets)[i]
        //pristup k elementum v divu
        presetContainer.children[i].children[0].innerHTML = presets[itemKey].name
        presetContainer.children[i].children[1].src = presets[itemKey].image
        presetContainer.children[i].children[2].innerHTML += presets[itemKey].author
    }
}




//SETUP---------------------------------------------------------------
optionCreator(juiceOptions1, juiceSelector1);
optionCreator(juiceOptions2, juiceSelector2);
makeCartList();
generateJuice();
loadPreset();
