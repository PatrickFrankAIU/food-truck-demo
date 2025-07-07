const express = require('express');
const { foodTrucks, truckSchedules } = require('./data.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/trucks', (req, res) => {
    const trucksOverview = foodTrucks.map(truck => {
        return {
            id: truck.id,
            name: truck.name,
            cuisine: truck.cuisine,
            rating: truck.rating,
            status: truck.status,
            currentLocation: truck.currentLocation,
            isMoving: truck.isMoving,
            estimatedArrival: truck.estimatedArrival,
            nextLocation: truck.nextLocation
        };
    });
    res.json(trucksOverview);
});

app.get('/api/truck/:id', (req, res) => {
    const truckId = parseInt(req.params.id);
    const truck = foodTrucks.find(t => t.id === truckId);
    if (!truck) {
        return res.status(404).json({ 
            error: 'Truck not found',
            message: 'No truck exists with ID ' + truckId 
        });
    }
    res.json(truck);
});

app.get('/api/schedule/:truckId', (req, res) => {
    const truckId = parseInt(req.params.truckId);
    
    // Check if truck exists first
    const truck = foodTrucks.find(t => t.id === truckId);
    if (!truck) {
        return res.status(404).json({ 
            error: 'Truck not found',
            message: 'No truck exists with ID ' + truckId 
        });
    }
    
    // Get schedule for this truck
    const schedule = truckSchedules[truckId];
    if (!schedule) {
        return res.status(404).json({ 
            error: 'Schedule not found',
            message: 'No schedule available for truck ID ' + truckId 
        });
    }
    
    res.json(schedule);
});

app.get('/', (req, res) => {
    res.send('<h1>Food Truck Tracker API</h1><p>Server is running!</p><p>Try these endpoints:</p><ul><li><a href="/api/trucks">/api/trucks</a></li><li><a href="/api/truck/1">/api/truck/1</a></li><li><a href="/api/schedule/1">/api/schedule/1</a></li></ul>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Food Truck Tracker API running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to test the server`);
    console.log(`API endpoints:`);
    console.log(`  GET /api/trucks - All trucks overview`);
    console.log(`  GET /api/truck/:id - Specific truck details`);
    console.log(`  GET /api/schedule/:truckId - Truck schedule`);
});

