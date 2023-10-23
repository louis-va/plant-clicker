const articleModal = document.getElementById("article-modal");
const buttonRules = document.getElementById("button-rules");

buttonRules.addEventListener("click", () => {
  if (
    articleModal.style.display === "none" ||
    articleModal.style.display === ""
  ) {
    articleModal.style.display = "block";
  } else {
    articleModal.style.display = "none";
  }
});
