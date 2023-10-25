/*
Author : SIVIXAY Celestin (Yaeshin)
*/

import "./panel";

(()=>{
    let currentUser = JSON.parse(localStorage.getItem("user"));
    if(currentUser==null){
        let user = {
            score:0,
            bank:0,
            multiplier:1,
            autoclick:0,
            boost:false
        };
        localStorage.setItem("user",JSON.stringify(user));
        currentUser=user;
    }
    
    document.getElementById("bank").innerHTML=currentUser.bank;
    document.getElementById("amountAutoClick").innerHTML=currentUser.autoclick;
    document.getElementById("autoClickPrice").innerHTML=getAutoClickerPrice();
    document.getElementById("amountMultiplier").innerHTML=currentUser.multiplier;
    document.getElementById("multiplierPrice").innerHTML=getMultiplierPrice();
    document.getElementById("boostPrice").innerHTML=getBoostPrice(currentUser.multiplier);

    document.getElementById("plantClicker").addEventListener("click", () => {
        currentUser=setScore(currentUser,getMultiplier());
        currentUser=setBank(currentUser,getMultiplier());
        document.getElementById("bank").innerHTML=currentUser.bank;
    });

    document.getElementById("purchaseAutoClick").addEventListener("click", () => {
        if(currentUser.bank<getAutoClickerPrice()){
            alert("You don't have enough points !");
        }else{
            currentUser=setBank(currentUser,-getAutoClickerPrice());
            document.getElementById("bank").innerHTML=currentUser.bank;
            currentUser=increaseAutoClicker(currentUser);
            document.getElementById("amountAutoClick").innerHTML=currentUser.autoclick;
            document.getElementById("autoClickPrice").innerHTML=getAutoClickerPrice();
        }
        
    });

    document.getElementById("purchaseMultiplier").addEventListener("click", () => {
        if(currentUser.bank<getMultiplierPrice()){
            alert("You don't have enough points !");
        }else{
            currentUser=setBank(currentUser,-getMultiplierPrice());
            document.getElementById("bank").innerHTML=currentUser.bank;
            currentUser=increaseMultiplier(currentUser);
            document.getElementById("amountMultiplier").innerHTML=currentUser.multiplier;
            document.getElementById("multiplierPrice").innerHTML=getMultiplierPrice();
            document.getElementById("boostPrice").innerHTML=getBoostPrice(currentUser.multiplier);
        }
        
    });

    document.getElementById("purchaseBoost").addEventListener("click", () => {
        if(currentUser.bank<getBoostPrice(currentUser.multiplier)){
            alert("You don't have enough points !");
        }else if(currentUser.boost){
            alert("Boost déjà actif !");
        }else{
            currentUser=setBank(currentUser,-getBoostPrice(currentUser.multiplier));
            document.getElementById("bank").innerHTML=currentUser.bank;
            currentUser=boostON(currentUser);
            setTimeout(boostOFF,30000);
        }
        
    });

    setInterval(autoClick,10000);

    function boostOFF(){
        currentUser.boost=false;
        localStorage.setItem("user",JSON.stringify(currentUser));
    }

    function autoClick(){
        currentUser=setScore(currentUser,getMultiplier()*getAutoClicker());
        currentUser=setBank(currentUser,getMultiplier()*getAutoClicker());
        document.getElementById("bank").innerHTML=JSON.parse(localStorage.getItem("user")).bank;
        
    }
})();

function getScore() {
  return JSON.parse(localStorage.getItem("user")).score;
}

function setScore(user, value){
    if(user.boost){
        value=value*3;
    }
    user.score=user.score+value;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}

function getBank() {
  return JSON.parse(localStorage.getItem("user")).bank;
}

function setBank(user, value){
    if(user.boost && value>0){
        value=value*3;
    }
    user.bank=user.bank+value;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}

function getMultiplier() {
  return JSON.parse(localStorage.getItem("user")).multiplier;
}

function increaseMultiplier(user) {
  user.multiplier++;
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

function getMultiplierPrice() {
  let multiplier = JSON.parse(localStorage.getItem("user")).multiplier;
  return 50 * Math.pow(2, multiplier);
}

function getAutoClicker(){
    return JSON.parse(localStorage.getItem("user")).autoclick;
}

function increaseAutoClicker(user) {
  user.autoclick++;
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

function getAutoClickerPrice() {
  let autoclick = JSON.parse(localStorage.getItem("user")).autoclick;
  return Math.round(100 * Math.pow(1.5, autoclick));
}

function boostON(user){
    user.boost=true;
    localStorage.setItem("user",JSON.stringify(user));
    return user;
}
