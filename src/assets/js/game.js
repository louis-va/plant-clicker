import Click from './click';

// Retrieve user data from localStorage or create a new user if not exists
let currentUser = JSON.parse(localStorage.getItem("user"));
if (currentUser == null) {
    let user = {
        score: 0,
        bank: 0,
        multiplier: 1,
        autoclick: 0,
        boost: false
    };
    localStorage.setItem("user", JSON.stringify(user));
    currentUser = user;
}

// Update HTML elements with initial user data
updateUI();

// Event listener for clicking on the plant
document.getElementById("plantClicker").addEventListener("click", (event) => {
    currentUser = setScore(currentUser, getMultiplier());
    currentUser = setBank(currentUser, getMultiplier());
    new Click(getMultiplier(), event.clientX, event.clientY, currentUser.boost)
    updateUI();
});

// Event listener for purchasing autoclicker
document.getElementById("purchaseAutoClick").addEventListener("click", () => {
    handlePurchase(getAutoClickerPrice(), "autoclick");
});

// Event listener for purchasing multiplier
document.getElementById("purchaseMultiplier").addEventListener("click", () => {
    handlePurchase(getMultiplierPrice(), "multiplier");
});

// Event listener for purchasing boost
document.getElementById("purchaseBoost").addEventListener("click", () => {
    handlePurchase(getBoostPrice(currentUser.multiplier), "boost");
});

// Handle purchases
function handlePurchase(price, type) {
    if (currentUser.bank < price) {
        alert("You don't have enough points!");
    } else {
        currentUser = setBank(currentUser, -price);
        switch (type) {
            case "autoclick":
                currentUser = increaseAutoClicker(currentUser);
                break;
            case "multiplier":
                currentUser = increaseMultiplier(currentUser);
                break;
            case "boost":
                currentUser = boostON(currentUser);
                setTimeout(boostOFF, 30000);
                break;
        }
        updateUI();
    }
}

// Update the UI with current user data
function updateUI() {
    document.getElementById("bank").innerHTML = currentUser.bank;
    document.getElementById("amountAutoClick").innerHTML = currentUser.autoclick;
    document.getElementById("autoClickPrice").innerHTML = getAutoClickerPrice();
    document.getElementById("amountMultiplier").innerHTML = currentUser.multiplier;
    document.getElementById("multiplierPrice").innerHTML = getMultiplierPrice();
    document.getElementById("boostPrice").innerHTML = getBoostPrice(currentUser.multiplier);
}

// Booster
function boostON(user){
    user.boost=true;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}

function boostOFF() {
    currentUser.boost = false;
    localStorage.setItem("user", JSON.stringify(currentUser));
    updateUI();
}

// Autoclicker
setInterval(autoClick, 1000);

function autoClick() {
    currentUser = setScore(currentUser, getMultiplier() * getAutoClicker());
    currentUser = setBank(currentUser, getMultiplier() * getAutoClicker());
    updateUI();
}

// Increment
function increaseAutoClicker(user) {
    user.autoclick++;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
}

function increaseMultiplier(user) {
    user.multiplier++;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
}

// Set value
function setScore(user, value){
    if(user.boost){
        value=value*3;
    }
    user.score=user.score+value;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}

function setBank(user, value){
    if(user.boost && value>0){
        value=value*3;
    }
    user.bank=user.bank+value;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}

// Get price
function getMultiplierPrice() {
    let multiplier = JSON.parse(localStorage.getItem("user")).multiplier;
    return 50 * Math.pow(2, multiplier);
}

function getAutoClickerPrice() {
  let autoclick = JSON.parse(localStorage.getItem("user")).autoclick;
  return Math.round(100 * Math.pow(1.5, autoclick));
}

function getBoostPrice(multiplier){
    return Math.round(100*multiplier);
}

// Get value
export function getScore() {
    return JSON.parse(localStorage.getItem("user")).score;
}

export function getBank() {
    return JSON.parse(localStorage.getItem("user")).bank;
}

export function getMultiplier() {
    return JSON.parse(localStorage.getItem("user")).multiplier;
}

export function getAutoClicker(){
    return JSON.parse(localStorage.getItem("user")).autoclick;
}