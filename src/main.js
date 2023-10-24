import './style.css'

import './assets/js/example'

(()=>{
    let currentUser = JSON.parse(localStorage.getItem("user"));
    if(currentUser === null){
        let user = {
            score:0,
            bank:0,
            multiplier:1,
            autoclick:0
        }
        localStorage.setItem("user",JSON.stringify(user));
        currentUser=user;
    }
    
    document.getElementById("plantClicker").addEventListener("click", () => {
        currentUser=setScore(currentUser,getMultiplier());
        currentUser=setBank(currentUser,getMultiplier());
    });
})();

function getScore(){
    return JSON.parse(localStorage.getItem("user")).score;
}

function setScore(user, value){
    user.score=user.score+value;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}


function getBank(){
    return JSON.parse(localStorage.getItem("user")).bank;
}

function setBank(user, value){
    user.bank=user.bank+value;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}


function getMultiplier(){
    return JSON.parse(localStorage.getItem("user")).multiplier;
}

function increaseMultiplier(user){
    user.multiplier++;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}

function getMultiplierPrice(){
    let multiplier= JSON.parse(localStorage.getItem("user")).multiplier;
    return 50*Math.pow(2,multiplier);
}


function getAutoClicker(){
    return JSON.parse(localStorage.getItem("user")).autoclick;
}

function increaseAutoClicker(user){
    user.autoclick++;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}

function getAutoClickerPrice(){
    let autoclick=JSON.parse(localStorage.getItem("user")).autoclick;
    return Math.round(100*Math.pow(1.5,autoclick));
}


function boost(){
    
}