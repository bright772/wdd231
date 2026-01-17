// support responsive navigation
const menuButton = document.getElementById("menu-button");
const navDrop = document.querySelector("nav");
const navHolder = document.getElementById("nav-holder-div");

menuButton.addEventListener("click", function () {
    menuButton.classList.toggle("show");
    navDrop.classList.toggle("show");
    navHolder.classList.toggle("show");
})

