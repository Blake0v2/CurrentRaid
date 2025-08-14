// Raid times for each island in terms of minute range (no overlap)
const raid_times = {
    "dedu_island": { "start": 15, "end": 29 },
    "snow_island": { "start": 30, "end": 44 },
    "jungle_island": { "start": 45, "end": 59 },
};

// Function to get the current raid based on the current minute
function getCurrentRaid() {
    const currentMinute = new Date().getMinutes(); // Get current minute
    let active_raids = [];

    // Log the current minute for debugging
    console.log("Current Minute:", currentMinute);

    // Loop through each raid and check if it is active
    for (let raid in raid_times) {
        const times = raid_times[raid];
        console.log(`Checking ${raid} - Start: ${times.start} End: ${times.end}`);  // Debug info
        if (times.start <= currentMinute && times.end >= currentMinute) {
            active_raids.push(raid);  // Add active raid to the list
        }
    }

    console.log("Active raids:", active_raids); // Log for debugging
    return active_raids;
}

// Show the active raids by displaying corresponding raid boxes
function showActiveRaids() {
    const activeRaids = getCurrentRaid();

    // Log active raids to debug
    console.log("Active Raids:", activeRaids);

    // Hide all raid boxes initially
    const raidBoxes = document.querySelectorAll('.raid-box');
    raidBoxes.forEach(box => {
        box.style.display = 'none';
    });

    // Update the raid status object dynamically
    const raid_status_dict = {
        "dedu_island": "Not started",
        "snow_island": "Not started",
        "jungle_island": "Not started"
    };

    // Set status to "In Progress" for active raids
    activeRaids.forEach(raid => {
        raid_status_dict[raid] = "In Progress"; 
        const raidBox = document.getElementById(raid);
        if (raidBox) {
            raidBox.style.display = 'block'; // Show the active raid box
        }
    });

    // Update the status on the page dynamically
    Object.keys(raid_status_dict).forEach(raid => {
        const raidStatusElem = document.getElementById(`${raid}-status`);
        if (raidStatusElem) {
            raidStatusElem.textContent = raid_status_dict[raid];
        }
    });

    // Log the updated raid status (for debugging purposes)
    console.log("Updated Raid Status:", raid_status_dict);
    return raid_status_dict;
}

// Function to show a specific page and hide others
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    selectedPage.style.display = 'block';
}

// Call showActiveRaids on page load
window.addEventListener('DOMContentLoaded', (event) => {
    showActiveRaids();
    // Set an interval to update the raid status every minute
    setInterval(showActiveRaids, 60000); // 60000ms = 1 minute
});

