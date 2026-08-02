import { discoverItems } from "../data/discover.mjs";

const grid = document.getElementById("discover-grid");

function cardHTML(item) {
    return `
        <div class="discover-card">
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn">Learn More</button>
        </div>`;
}

if (grid) {
    grid.innerHTML = discoverItems.map(cardHTML).join("");

    const modal = document.getElementById("discover-modal");
    const modalTitle = document.getElementById("discover-modal-title");
    const modalImg = document.getElementById("discover-modal-img");
    const modalAddress = document.getElementById("discover-modal-address");
    const modalDescription = document.getElementById("discover-modal-description");
    const modalLink = document.getElementById("discover-modal-link");

    grid.querySelectorAll(".discover-card").forEach((card, index) => {
        const item = discoverItems[index];
        card.querySelector(".learn-more-btn").addEventListener("click", () => {
            if (!modal) return;
            modalTitle.textContent = item.name;
            modalImg.src = item.image;
            modalImg.alt = item.name;
            modalAddress.textContent = item.address;
            modalDescription.textContent = item.description;
            modalLink.href = item.website;
            modal.showModal();
        });
    });

    document.getElementById("discover-modal-close")?.addEventListener("click", () => {
        modal.close();
    });
}

const VISIT_KEY = "chamberDiscoverLastVisit";
const messageHolder = document.getElementById("visit-message-text");
const messageBox = document.getElementById("visit-message");

function buildVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem(VISIT_KEY);

    let message;
    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const msSinceLastVisit = now - Number(lastVisit);
        const oneDay = 24 * 60 * 60 * 1000;

        if (msSinceLastVisit < oneDay) {
            message = "Back so soon! Great!";
        } else {
            const days = Math.floor(msSinceLastVisit / oneDay);
            message = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
        }
    }

    localStorage.setItem(VISIT_KEY, String(now));
    return message;
}

if (messageHolder && messageBox) {
    messageHolder.textContent = buildVisitMessage();
    document.getElementById("visit-message-close")?.addEventListener("click", () => {
        messageBox.remove();
    });
}
