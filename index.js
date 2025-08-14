// Function to show a specific page and hide others
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    selectedPage.style.display = 'block';
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}

const express = require('express');
const moment = require('moment');

const app = express();
const port = 3000;

let current_raid = {
    "snow_island": "Not started",
    "jungle_island": "Not started",
    "dedu_island": "Not started"
};

// Raid times for each island in terms of minute range
const raid_times = {
    "dedu_island": { "start": 0, "end": 29 },
    "snow_island": { "start": 30, "end": 44 },
    "jungle_island": { "start": 15, "end": 29 },
};

// Endpoint to get the current raid status
app.get('/current_raid', (req, res) => {
    const raidStatus = getCurrentRaid();
    res.json({ current_raid: raidStatus });
});

// Endpoint for the current raid page
app.get('/current_raid_page', (req, res) => {
    const current_time = moment().format('HH:mm:ss');
    const { active_raids, raid_status } = getCurrentRaid();

    // Update raid_status to reflect active raids
    let raid_status_dict = {
        "dedu_island": "Not started",
        "snow_island": "Not started",
        "jungle_island": "Not started"
    };

    active_raids.forEach(raid => {
        raid_status_dict[raid] = raid_status;  // Set active raid to "In Progress"
    });

    const next_raid_start = getNextRaidStart();
    
    res.render('current_raid', {
        current_time,
        raid_status: raid_status_dict,
        time_to_next_raid: next_raid_start
    });
});

// Helper function to get the current raid
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

    if (active_raids.length > 0) {
        return { active_raids, raid_status: "In Progress" };
    } else {
        return { active_raids: ["jungle_island"], raid_status: "Not started" };
    }
}

// Helper function to get the next raid start
function getNextRaidStart() {
    const currentMinute = moment().minute();
    let next_raid_start = null;

    // Find the next raid start time
    for (let raid in raid_times) {
        const times = raid_times[raid];
        if (currentMinute < times.start) {
            next_raid_start = `${raid} starts at ${times.start} minute`;
            break;
        } else if (currentMinute > times.end) {
            next_raid_start = `${raid} starts at ${times.start} minute`;
        }
    }

    if (!next_raid_start) {
        next_raid_start = `Next raid starts at 00 minute (Jungle Island)`;
    }

    return next_raid_start;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
