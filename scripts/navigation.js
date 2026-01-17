// support responsive navigation
const menuButton = document.getElementById("menu-button");
const navDrop = document.querySelector("nav");

menuButton.addEventListener("click", function () {
    menuButton.classList.toggle("show");
    navDrop.classList.toggle("show");
})

