// support responsive navigation
const menuButton = document.getElementById("menu-button");
const navDrop = document.querySelector("nav");

// this 'if' is a form of error checking
if (menuButton) {
    if (navDrop) { // can do && here
        menuButton.addEventListener("click", function () {
            menuButton.classList.toggle("show");
            navDrop.classList.toggle("show");
            }
        )
    }
}

// This could be a way to check the current page:
// document.querySelectorAll(".nav-links").forEach((link) => {
//     const linkPage = link.getAttribute("href");
//     const herePage = location.pathname.split("/").pop() || "index.html";
//     link.classList.remove("current-page", "non-current-page");
//     if (linkPage === herePage) {
//         link.classList.add("current-page");
//         link.setAttribute("aria-current", "page");
//     } else {
//         link.classList.add("non-current-page");
//     }
// });
