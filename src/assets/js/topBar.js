const articleModal = document.getElementById("article-modal");
const buttonRules = document.getElementById("button-rules");
const buttonStats = document.getElementById("button-stats");
const croixRules = document.getElementById("croix-rules");
const croixStats = document.getElementById("croix-stats");
const cache = document.getElementById("cache");
const stat = document.getElementById("stat");

function togle(el) {
  if (el.style.display === "none" || el.style.display === "") {
    el.style.display = "block";
    cache.style.display = "block";
  } else {
    el.style.display = "none";
    cache.style.display = "none";
  }
}

buttonRules.addEventListener("click", () => {
  togle(articleModal);
});

croixRules.addEventListener("click", () => {
  togle(articleModal);
});

buttonStats.addEventListener("click", () => {
  togle(stat);
});
croixStats.addEventListener("click", () => {
  togle(stat);
});
