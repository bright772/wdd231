const gridBtn = document.getElementById("grid-view-btn");
const listBtn = document.getElementById("list-view-btn");
const cardHolder = document.getElementById("div-member-card-holder");

if (gridBtn && listBtn && cardHolder) {
    gridBtn.addEventListener("click", () => {
        cardHolder.classList.remove("list-view");
        gridBtn.classList.add("active-view");
        listBtn.classList.remove("active-view");
    });
    listBtn.addEventListener("click", () => {
        cardHolder.classList.add("list-view");
        listBtn.classList.add("active-view");
        gridBtn.classList.remove("active-view");
    });
}
