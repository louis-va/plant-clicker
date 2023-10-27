function fullPourcent(el) {
  el.style.width = "100%";
}

function zeroPourcent(el) {
  el.style.width = "0%";
}
function addClass(el, node) {
  el.classList.add(node);
}
function delClass(el, node) {
  el.classList.remove(node);
}
const bankElement = document.getElementById("bank");
const tamponAutoclicker = document.getElementById("tampon-autoclick");
const tamponMultiplier = document.getElementById("tampon-multiplier");
const tamponBooster = document.getElementById("tampon-boost");
const buttonBoost = document.getElementById("purchaseBoost");
const cligno = "to-cligno";
const toCent = "to-cent";
let boosterUnlocked = false;
// Fonction pour gérer les mutations du DOM
function handleDOMMutation(mutationsList, observer) {
  const currentValueBank = parseInt(bankElement.textContent);
  const currentValueAutoClickPrice = parseInt(
    document.getElementById("autoClickPrice").textContent
  );
  const currentValueMultiplier = parseInt(
    document.getElementById("multiplierPrice").textContent
  );
  const currentValueBooster = parseInt(
    document.getElementById("boostPrice").textContent
  );
  if (currentValueAutoClickPrice <= currentValueBank) {
    fullPourcent(tamponAutoclicker);
  } else {
    zeroPourcent(tamponAutoclicker);
  }
  if (currentValueMultiplier <= currentValueBank) {
    fullPourcent(tamponMultiplier);
  } else {
    zeroPourcent(tamponMultiplier);
  }
  if (currentValueBooster <= currentValueBank) {
    fullPourcent(tamponBooster);
    boosterUnlocked = true;
  } else if (boosterUnlocked === true) {
    zeroPourcent(tamponBooster);
    addClass(tamponBooster, toCent);
  } else {
    zeroPourcent(tamponBooster);
  }
}

// new instance of class mutation call handleDOMMUation
const observer = new MutationObserver(handleDOMMutation);

// Define observer : child check node, substree check edit
const config = { childList: true, subtree: true };

// begin observer from bank
observer.observe(bankElement, config);
