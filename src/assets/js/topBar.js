const articleModal = document.getElementById("article-modal");
const buttonRules = document.getElementById("button-rules");
const croix = document.getElementById("croix");
const cache = document.getElementById("cache");

function togle() {
  if (
    articleModal.style.display === "none" ||
    articleModal.style.display === ""
  ) {
    articleModal.style.display = "block";
    cache.style.display = "block";
  } else {
    articleModal.style.display = "none";
    cache.style.display = "none";
  }
}

buttonRules.addEventListener("click", togle);

croix.addEventListener("click", togle);
