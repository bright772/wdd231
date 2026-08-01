
async function getMembers() { // get the data from the JSON file
    const response = await fetch("scripts/members.json");
    const data = await response.json();
    return data.membersArray;
}

function memberCardHTML(member) {
    return `
        <div class="div-member-card">
            <img src="${member.image}" alt="${member.name}" height="80px">
            <h3>${member.name}</h3>
            <p>${member.phone}</p>
            <p class="wrap">${member.address}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Site</a></p>
            <p><em>${member.membershipLevel} member</em></p>
        </div>`;
}

async function displayMembers() {
    const holder = document.getElementById("div-member-card-holder");
    if (!holder) return;
    try {
        const members = await getMembers();
        holder.innerHTML = members.map(memberCardHTML).join("");
    } catch (error) {
        holder.innerHTML = "<p>Member data failed to load.</p>";
        console.error(error);
    }
}
displayMembers();

