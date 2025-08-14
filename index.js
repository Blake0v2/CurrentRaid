window.addEventListener('DOMContentLoaded', (event) => {
    showActiveRaids();
    // Set an interval to update the raid status every minute
    setInterval(showActiveRaids, 60000); // 60000ms = 1 minute
});

// Raid times for each island in terms of minute range (no overlap)
const raid_times = {
    "dedu_island": { "start": 15, "end": 29 },    // Dedu Island from minute 0 to 29
    "snow_island": { "start": 30, "end": 44 },   // Snow Island from minute 30 to 44
    "jungle_island": { "start": 0, "end": 29 }, // Jungle Island from minute 15 to 29
};

// Function to get the current raid based on the current minute
function getCurrentRaid() {
    const currentMinute = moment().minute();
    let active_raids = [];

    // Check active raids based on current minute
    for (let raid in raid_times) {
        const times = raid_times[raid];
        if (times.start <= currentMinute && times.end >= currentMinute) {
            active_raids.push(raid);
        }
    }

    console.log("Active raids:", active_raids); // Log for debugging

    return active_raids;
}

// Show the active raids by displaying corresponding raid boxes
function showActiveRaids() {
    const activeRaids = getCurrentRaid();

    // Hide all raid boxes initially
    const raidBoxes = document.querySelectorAll('.raid-box');
    raidBoxes.forEach(box => {
        box.style.display = 'none';
    });

    // Show the active raids
    activeRaids.forEach(raid => {
        const raidBox = document.getElementById(raid);
        if (raidBox) {
            raidBox.style.display = 'block';
        }
    });
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
