// Function to check the current time and update raid statuses
function updateRaidStatusBasedOnTime() {
    const currentTime = new Date();
    const minutes = currentTime.getMinutes();
    const raidStatuses = {
        'dedu-island': 'Inactive',
        'snow-island': 'Inactive',
        'jungle-island': 'Inactive',
    };

    // Set the raid status based on the minute range
    if (minutes >= 15 && minutes <= 29) {
        raidStatuses['dedu-island'] = 'Active';
        raidStatuses['jungle-island'] = 'Active';
    } else if (minutes >= 45 && minutes <= 59) {
        raidStatuses['snow-island'] = 'Active';
    }

    // Update the UI based on these statuses
    updateRaidStatus('dedu-island', raidStatuses['dedu-island']);
    updateRaidStatus('snow-island', raidStatuses['snow-island']);
    updateRaidStatus('jungle-island', raidStatuses['jungle-island']);
}

// Function to update the raid status on the page
function updateRaidStatus(raidId, status) {
    const raidStatusElement = document.getElementById(`${raidId}-status`);
    if (raidStatusElement) {
        raidStatusElement.textContent = status;

        // Change the color based on the status
        if (status === 'Active') {
            raidStatusElement.style.color = 'green';
        } else {
            raidStatusElement.style.color = 'red';
        }
    }
}

// Function to show Current Raid Status based on time range
function showCurrentRaidStatus() {
    const currentTime = new Date();
    const minutes = currentTime.getMinutes(); // Get current minute

    // Check if current minute is between 15 and 29
    if (minutes >= 15 && minutes <= 29) {
        document.getElementById('current-raid').style.display = 'block';
    } else {
        document.getElementById('current-raid').style.display = 'none';
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateRaidStatusBasedOnTime(); // Update the raid statuses on load
    showCurrentRaidStatus(); // Show the current raid based on the time

    // Refresh the raid status every minute to update the state
    setInterval(updateRaidStatusBasedOnTime, 60000);

    // Refresh the current raid status visibility every minute
    setInterval(showCurrentRaidStatus, 60000);
});

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
