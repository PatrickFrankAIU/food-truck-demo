// Main JavaScript file for Food Truck Tracker
// this version uses async/await instead of a promise chain
// (changes indicated in comments)

let currentView = 'trucks'; // Track which view is displayed
let currentTruckId = null; // Track selected truck for details/schedule

document.addEventListener('DOMContentLoaded', () => {
    loadAllTrucks();
    setupEventListeners();
});

// button click handlers
function setupEventListeners() {
    let refreshBtn = document.getElementById('refreshBtn');
    let backBtn = document.getElementById('backBtn');
    let backFromScheduleBtn = document.getElementById('backFromScheduleBtn');
    
    // CHANGED: Updated event listener to handle async function
    refreshBtn.addEventListener('click', async () => {
        await loadAllTrucks();
    });
    
    backBtn.addEventListener('click', () => {
        showTrucksView();
    });
    
    backFromScheduleBtn.addEventListener('click', async () => {
        if (currentTruckId) {
            // CHANGED: Added await keyword since loadTruckDetails is now async
            await loadTruckDetails(currentTruckId);
        }
    });
}

// Load all trucks from the API
// CHANGED: Modified to use async/await instead of promise chain
async function loadAllTrucks() {
    let trucksContainer = document.getElementById('trucksContainer');
    trucksContainer.innerHTML = '<p class="loading">Loading food trucks...</p>';
    
    // CHANGED: Added try/catch block for error handling with async/await
    try {
        // CHANGED: Added await keyword before fetch call
        let response = await fetch('/api/trucks');
        
        // CHANGED: Moved response.ok check inside try block
        if (response.ok) {
            // CHANGED: Added await keyword before response.json()
            let trucks = await response.json();
            displayTrucks(trucks);
        } else {
            throw new Error('Failed to load trucks');
        }
    } catch (error) {
        // CHANGED: Moved error handling to catch block
        console.error('Error loading trucks:', error);
        trucksContainer.innerHTML = '<p>Error loading food trucks. Please try again.</p>';
    }
}

// Display the list of trucks
function displayTrucks(trucks) {
    let trucksContainer = document.getElementById('trucksContainer');
    let trucksHTML = '';
    
    if (trucks.length === 0) {
        trucksHTML = '<p>No food trucks available right now.</p>';
    } else {
        for (let i = 0; i < trucks.length; i++) {
            let truck = trucks[i];
            trucksHTML = trucksHTML + createTruckCard(truck);
        }
    }
    
    trucksContainer.innerHTML = trucksHTML;
    
    // Add click handlers to truck cards
    let truckCards = document.querySelectorAll('.truck-card');
    for (let i = 0; i < truckCards.length; i++) {
        let card = truckCards[i];
        let truckId = card.getAttribute('data-truck-id');
        card.addEventListener('click', async () => {
            // CHANGED: Added await keyword since loadTruckDetails is now async
            await loadTruckDetails(truckId);
        });
    }
}

// Create HTML for a single truck card
function createTruckCard(truck) {
    let statusClass = 'status-' + truck.status;
    let movingClass = '';
    
    if (truck.isMoving) {
        movingClass = ' truck-moving';
    }
    
    let nextLocationHTML = '';
    if (truck.nextLocation && truck.estimatedArrival) {
        nextLocationHTML = '<div class="info-item"><strong>Next:</strong> ' + truck.nextLocation + ' at ' + truck.estimatedArrival + '</div>';
    }
    
    let cardHTML = '<div class="truck-card' + movingClass + '" data-truck-id="' + truck.id + '">';
    cardHTML = cardHTML + '<div class="truck-header">';
    cardHTML = cardHTML + '<div>';
    cardHTML = cardHTML + '<div class="truck-name">' + truck.name + '</div>';
    cardHTML = cardHTML + '<div class="truck-cuisine">' + truck.cuisine + ' Cuisine</div>';
    cardHTML = cardHTML + '</div>';
    cardHTML = cardHTML + '<div class="truck-status ' + statusClass + '">' + truck.status + '</div>';
    cardHTML = cardHTML + '</div>';
    cardHTML = cardHTML + '<div class="truck-info">';
    cardHTML = cardHTML + '<div class="info-item"><strong>Rating:</strong> <span class="rating">⭐ ' + truck.rating + '</span></div>';
    cardHTML = cardHTML + '<div class="info-item"><strong>Location:</strong> ' + truck.currentLocation + '</div>';
    cardHTML = cardHTML + nextLocationHTML;
    cardHTML = cardHTML + '</div>';
    cardHTML = cardHTML + '</div>';
    
    return cardHTML;
}

// Load detailed information for a specific truck
// CHANGED: Modified to use async/await instead of promise chain
async function loadTruckDetails(truckId) {
    currentTruckId = truckId;
    let detailsContainer = document.getElementById('truckDetails');
    detailsContainer.innerHTML = '<p class="loading">Loading truck details...</p>';
    
    showDetailsView();
    
    // CHANGED: Added try/catch block for error handling with async/await
    try {
        // CHANGED: Added await keyword before fetch call
        let response = await fetch('/api/truck/' + truckId);
        
        // CHANGED: Moved response.ok check inside try block
        if (response.ok) {
            // CHANGED: Added await keyword before response.json()
            let truck = await response.json();
            displayTruckDetails(truck);
        } else {
            throw new Error('Failed to load truck details');
        }
    } catch (error) {
        // CHANGED: Moved error handling to catch block
        console.error('Error loading truck details:', error);
        detailsContainer.innerHTML = '<p>Error loading truck details. Please try again.</p>';
    }
}

// Display detailed truck information
function displayTruckDetails(truck) {
    let detailsContainer = document.getElementById('truckDetails');
    
    let specialtiesHTML = '';
    for (let i = 0; i < truck.specialties.length; i++) {
        specialtiesHTML = specialtiesHTML + '<li>' + truck.specialties[i] + '</li>';
    }
    
    let statusClass = 'status-' + truck.status;
    
    let detailsHTML = '<div class="truck-detail-card">';
    detailsHTML = detailsHTML + '<div class="detail-header">';
    detailsHTML = detailsHTML + '<div class="detail-name">' + truck.name + '</div>';
    detailsHTML = detailsHTML + '<div class="detail-description">' + truck.description + '</div>';
    detailsHTML = detailsHTML + '<div class="truck-status ' + statusClass + '">' + truck.status + '</div>';
    detailsHTML = detailsHTML + '</div>';
    
    detailsHTML = detailsHTML + '<div class="detail-grid">';
    
    detailsHTML = detailsHTML + '<div class="detail-section">';
    detailsHTML = detailsHTML + '<h3>📍 Location Info</h3>';
    detailsHTML = detailsHTML + '<p><strong>Current Location:</strong> ' + truck.currentLocation + '</p>';
    if (truck.nextLocation) {
        detailsHTML = detailsHTML + '<p><strong>Next Location:</strong> ' + truck.nextLocation + '</p>';
    }
    if (truck.estimatedArrival) {
        detailsHTML = detailsHTML + '<p><strong>Estimated Arrival:</strong> ' + truck.estimatedArrival + '</p>';
    }
    detailsHTML = detailsHTML + '</div>';
    
    detailsHTML = detailsHTML + '<div class="detail-section">';
    detailsHTML = detailsHTML + '<h3>📞 Contact Info</h3>';
    detailsHTML = detailsHTML + '<p><strong>Phone:</strong> ' + truck.phone + '</p>';
    detailsHTML = detailsHTML + '<p><strong>Hours:</strong> ' + truck.hours + '</p>';
    detailsHTML = detailsHTML + '<p><strong>Rating:</strong> <span class="rating">⭐ ' + truck.rating + '</span></p>';
    detailsHTML = detailsHTML + '</div>';
    
    detailsHTML = detailsHTML + '<div class="detail-section">';
    detailsHTML = detailsHTML + '<h3>🍽️ Specialties</h3>';
    detailsHTML = detailsHTML + '<ul class="specialties-list">' + specialtiesHTML + '</ul>';
    detailsHTML = detailsHTML + '</div>';
    
    detailsHTML = detailsHTML + '</div>';
    
    detailsHTML = detailsHTML + '<button id="viewScheduleBtn">📅 View Weekly Schedule</button>';
    detailsHTML = detailsHTML + '</div>';
    
    detailsContainer.innerHTML = detailsHTML;
    
    // Add click handler for schedule button
    let scheduleBtn = document.getElementById('viewScheduleBtn');
    scheduleBtn.addEventListener('click', async () => {
        // CHANGED: Added await keyword since loadTruckSchedule is now async
        await loadTruckSchedule(truck.id);
    });
}

// Load schedule for a specific truck
// CHANGED: Modified to use async/await instead of promise chain
async function loadTruckSchedule(truckId) {
    let scheduleContainer = document.getElementById('scheduleDetails');
    scheduleContainer.innerHTML = '<p class="loading">Loading schedule...</p>';
    
    showScheduleView();
    
    // CHANGED: Added try/catch block for error handling with async/await
    try {
        // CHANGED: Added await keyword before fetch call
        let response = await fetch('/api/schedule/' + truckId);
        
        // CHANGED: Moved response.ok check inside try block
        if (response.ok) {
            // CHANGED: Added await keyword before response.json()
            let scheduleData = await response.json();
            displayTruckSchedule(scheduleData);
        } else {
            throw new Error('Failed to load schedule');
        }
    } catch (error) {
        // CHANGED: Moved error handling to catch block
        console.error('Error loading schedule:', error);
        scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again.</p>';
    }
}

// Display the truck's weekly schedule
function displayTruckSchedule(scheduleData) {
    let scheduleContainer = document.getElementById('scheduleDetails');
    
    let scheduleHTML = '<div class="schedule-container">';
    scheduleHTML = scheduleHTML + '<h3>' + scheduleData.truckName + ' - Weekly Schedule</h3>';
    
    // Group schedule by day
    let daySchedule = {};
    for (let i = 0; i < scheduleData.schedule.length; i++) {
        let item = scheduleData.schedule[i];
        if (!daySchedule[item.day]) {
            daySchedule[item.day] = [];
        }
        daySchedule[item.day].push(item);
    }
    
    // Days of the week in order
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    for (let d = 0; d < days.length; d++) {
        let day = days[d];
        if (daySchedule[day]) {
            scheduleHTML = scheduleHTML + '<div class="schedule-day">';
            scheduleHTML = scheduleHTML + '<div class="day-header">' + day + '</div>';
            
            for (let s = 0; s < daySchedule[day].length; s++) {
                let schedule = daySchedule[day][s];
                scheduleHTML = scheduleHTML + '<div class="schedule-location">';
                scheduleHTML = scheduleHTML + '<span class="location-name">📍 ' + schedule.location + '</span>';
                scheduleHTML = scheduleHTML + '<span class="location-hours">' + schedule.hours + '</span>';
                scheduleHTML = scheduleHTML + '</div>';
            }
            
            scheduleHTML = scheduleHTML + '</div>';
        }
    }
    
    scheduleHTML = scheduleHTML + '</div>';
    scheduleContainer.innerHTML = scheduleHTML;
}

// Show the trucks list view
function showTrucksView() {
    document.getElementById('trucksSection').style.display = 'block';
    document.getElementById('detailsSection').style.display = 'none';
    document.getElementById('scheduleSection').style.display = 'none';
    currentView = 'trucks';
}

// Show the truck details view
function showDetailsView() {
    document.getElementById('trucksSection').style.display = 'none';
    document.getElementById('detailsSection').style.display = 'block';
    document.getElementById('scheduleSection').style.display = 'none';
    currentView = 'details';
}

// Show the schedule view
function showScheduleView() {
    document.getElementById('trucksSection').style.display = 'none';
    document.getElementById('detailsSection').style.display = 'none';
    document.getElementById('scheduleSection').style.display = 'block';
    currentView = 'schedule';
}