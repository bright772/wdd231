async function displaySpotlights() {
    const holder = document.getElementById("spotlight-holder");
    if (!holder) return; // to make sure
    try {
        const members = await getMembers();
        const goldSilver = members.filter(
            (memb) => memb.membershipLevel === "gold" || memb.membershipLevel === "silver"
        );
        // const shuffled = goldSilver.sort(() => 0.5 - Math.random()); // apparently this is an inferior shuffle
        // instead, use this "Fisher-Yates (Knuth) algorithm"; this 
        // goes through each element, makes a random index between 
        // 0-1, and swaps the element with the one at the new index
        
        const shuffled = goldSilver.slice(); // creates a safe copy
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        const count = Math.min(3, Math.floor(Math.random() * 2) + 2, shuffled.length);
        // this returns either the array length itself if 0-2, or randomly 2 or 3 with length > 2
        const selected = shuffled.slice(0, count); // grabs the first 'count' of the shuffle
        holder.innerHTML = selected
            .map(
                (member) => `
            <div class="spotlight-card">
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Visit Site</a></p>
                <p><em>${member.membershipLevel} member</em></p>
            </div>`
                // "The noopener keyword for the rel attribute of the <a>, 
                // <area>, and <form> elements instructs the browser to 
                // navigate to the target resource without granting the 
                // new browsing context access to the document that 
                // opened it — by not setting the Window.opener property 
                // on the opened window (it returns null).
                // This is especially useful when opening untrusted links, 
                // in order to ensure they cannot tamper with the 
                // originating document via the Window.opener property, 
                // while still providing the Referer HTTP header (unless 
                // noreferrer is used as well)."            
            )
            .join("");
    } catch (error) {
        holder.innerHTML = "<p>There was a problem loading the data.</p>";
        console.error(error);
    }
}

async function getMembers() { // get the data from the JSON file
    const response = await fetch("data/members.json");
    const data = await response.json();
    return data.membersArray;
}

displaySpotlights();
