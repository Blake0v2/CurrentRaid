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
    } else if (minutes >= 30 && minutes <= 45) {
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

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateRaidStatusBasedOnTime();
    
    // Refresh the raid status every minute to update the state
    setInterval(updateRaidStatusBasedOnTime, 60000);
});

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

// Call the function every minute to update the page visibility
setInterval(showCurrentRaidStatus, 60000); // Update every minute

// Initial check when the page loads
showCurrentRaidStatus();
