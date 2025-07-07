let currentView = 'trucks'; // Tracks which view is dispalyed
let currentTruckId = null; // Tracks selected truck for details & schedule

document.addEventListener('DOMContentLoaded', () => {
    loadAllTrucks();
    setupEventListeners();
});

// event handlers
function setupEventListeners() {
    let refreshBtn = document.getElementById('refreshBtn');
    let backBtn = document.getElementById('backBtn');
    let backFromScheduleBtn = document.getElementById('backFromScheduleBtn');
    
    refreshBtn.addEventListener('click', () => {
        loadAllTrucks();
    });
    
    backBtn.addEventListener('click', () => {
        showTrucksView();
    });
    
    backFromScheduleBtn.addEventListener('click', () => {
        if (currentTruckId) {
            loadTruckDetails(currentTruckId);
        }
    });
}

// load all trucks from API call (promise chain)
function loadAllTrucks() {
    let trucksContainer = document.getElementById('trucksContainer');
    trucksContainer.innerHTML = '<p class="loading">Loading food trucks...</p>';
    
    fetch('/api/trucks')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to load trucks');
            }
        })
        .then((trucks) => {
            displayTrucks(trucks);
        })
        .catch((error) => {
            console.error('Error loading trucks:', error);
            trucksContainer.innerHTML = '<p>Error loading food trucks. Please try again.</p>';
        });
}

// list trucks
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
    
    // click handler for truck cards
    let truckCards = document.querySelectorAll('.truck-card');
    for (let i = 0; i < truckCards.length; i++) {
        let card = truckCards[i];
        let truckId = card.getAttribute('data-truck-id');
        card.addEventListener('click', () => {
            loadTruckDetails(truckId);
        });
    }
}

// HTML for a single truck card
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

// Load detailed info for a specific truck
function loadTruckDetails(truckId) {
    currentTruckId = truckId;
    let detailsContainer = document.getElementById('truckDetails');
    detailsContainer.innerHTML = '<p class="loading">Loading truck details...</p>';
    
    showDetailsView();
    
    fetch('/api/truck/' + truckId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to load truck details');
            }
        })
        .then((truck) => {
            displayTruckDetails(truck);
        })
        .catch((error) => {
            console.error('Error loading truck details:', error);
            detailsContainer.innerHTML = '<p>Error loading truck details. Please try again.</p>';
        });
}

// Display detailed truck info
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
    scheduleBtn.addEventListener('click', () => {
        loadTruckSchedule(truck.id);
    });
}

// Load schedule for a specific truck
function loadTruckSchedule(truckId) {
    let scheduleContainer = document.getElementById('scheduleDetails');
    scheduleContainer.innerHTML = '<p class="loading">Loading schedule...</p>';
    
    showScheduleView();
    
    fetch('/api/schedule/' + truckId)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to load schedule');
            }
        })
        .then((scheduleData) => {
            displayTruckSchedule(scheduleData);
        })
        .catch((error) => {
            console.error('Error loading schedule:', error);
            scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again.</p>';
        });
}

// Display a specific truck's weekly schedule
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

// list view (list of trucks)
function showTrucksView() {
    document.getElementById('trucksSection').style.display = 'block';
    document.getElementById('detailsSection').style.display = 'none';
    document.getElementById('scheduleSection').style.display = 'none';
    currentView = 'trucks';
}

// details view
function showDetailsView() {
    document.getElementById('trucksSection').style.display = 'none';
    document.getElementById('detailsSection').style.display = 'block';
    document.getElementById('scheduleSection').style.display = 'none';
    currentView = 'details';
}

// schedule view
function showScheduleView() {
    document.getElementById('trucksSection').style.display = 'none';
    document.getElementById('detailsSection').style.display = 'none';
    document.getElementById('scheduleSection').style.display = 'block';
    currentView = 'schedule';
}