/*
Author : SIVIXAY Celestin (Yaeshin)
*/

(()=>{
    let currentUser = JSON.parse(localStorage.getItem("user"));
    if(currentUser==null){
        let user = {
            score:0,
            bank:0,
            multiplier:1,
            autoclick:0
        };
        localStorage.setItem("user",JSON.stringify(user));
        currentUser=user;
    }
    
    document.getElementById("bank").innerHTML=currentUser.bank;
    document.getElementById("amountAutoClick").innerHTML=currentUser.autoclick;
    document.getElementById("autoClickPrice").innerHTML=getAutoClickerPrice();
    document.getElementById("amountMultiplier").innerHTML=currentUser.multiplier;
    document.getElementById("multiplierPrice").innerHTML=getMultiplierPrice();
    document.getElementById("boostPrice").innerHTML=getBoostPrice(currentUser.multiplier,currentUser.autoclick);

    document.getElementById("plantClicker").addEventListener("click", () => {
        currentUser=setScore(currentUser,getMultiplier());
        currentUser=setBank(currentUser,getMultiplier());
        document.getElementById("bank").innerHTML=currentUser.bank;
    });

    document.getElementById("purchaseAutoClick").addEventListener("click", () => {
        if(currentUser.bank<getAutoClickerPrice()){
            alert("You don't have enough points ");
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
            alert("You don't have enough points ");
        }else{
            currentUser=setBank(currentUser,-getMultiplierPrice());
            document.getElementById("bank").innerHTML=currentUser.bank;
            currentUser=increaseMultiplier(currentUser);
            document.getElementById("amountMultiplier").innerHTML=currentUser.multiplier;
            document.getElementById("multiplierPrice").innerHTML=getMultiplierPrice();
        }
        
    });

    setInterval(autoClick,10000);

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

function autoClick(){
    setScore(JSON.parse(localStorage.getItem("user")),getMultiplier()*getAutoClicker());
    setBank(JSON.parse(localStorage.getItem("user")),getMultiplier()*getAutoClicker());
    document.getElementById("bank").innerHTML=JSON.parse(localStorage.getItem("user")).bank;
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


function boost(boolean){
    
}

function getBoostPrice(multiplier){
    return Math.round(200*multiplier);
}