const timestampField = document.getElementById("timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}
 
document.querySelectorAll(".modal-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = document.getElementById(trigger.dataset.modal);
        if (dialog) dialog.showModal();
    });
});
 
document.querySelectorAll(".modal-close").forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        button.closest("dialog").close();
    });
});
 