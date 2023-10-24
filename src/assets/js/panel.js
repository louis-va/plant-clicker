const evolutionAutoClicker = document.getElementById("evolution-auto-clicker");

function pinked() {
  evolutionAutoClicker.style.border = "3px solid var(--pink)";
}
evolutionAutoClicker.addEventListener("click", pinked);
