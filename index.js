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
