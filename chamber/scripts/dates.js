// support dates
const thisYear = new Date().getFullYear();
const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();
const lastModifiedTime = new Date(document.lastModified).toLocaleTimeString();
document.getElementById("year-copy").innerText = thisYear;
document.getElementById("date-modify").innerText = lastModifiedDate + " " + lastModifiedTime;