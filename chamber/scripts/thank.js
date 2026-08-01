const parameters = new URLSearchParams(window.location.search);
 
const fieldMap = {
    "out-first-name": "firstName",
    "out-last-name": "lastName",
    "out-e-mail": "e-mail",
    "out-telephone": "telephone",
    "out-business-name": "businessName",
};
 
Object.entries(fieldMap).forEach(([elementId, parameterName]) => {
    const element = document.getElementById(elementId);
    if (element) element.textContent = parameters.get(parameterName) || "(not provided)";
});
 
const timestampElement = document.getElementById("out-timestamp");
if (timestampElement) {
    const raw = parameters.get("timestamp");
    timestampElement.textContent = raw ? new Date(raw).toLocaleString() : "(not provided)";
}
