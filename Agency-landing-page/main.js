const buttonHamburger = document.querySelector(".button-hamburger");
const menuRow = document.querySelector(".menu");

buttonHamburger.addEventListener("click", function () {
    menuRow.classList.toggle("menu-visible");
});
