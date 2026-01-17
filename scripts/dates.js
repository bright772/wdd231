// support dates
const thisYear = new Date().getFullYear();
const lastModified = new Date(document.lastModified).toDateString();
document.getElementById("year-copy").innerText = thisYear;
document.getElementById("date-modify").innerText = lastModified;