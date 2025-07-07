// Sample data - in a real app this might come from a database
const foodTrucks = [
    {
        id: 1,
        name: "Taco Paradise",
        cuisine: "Mexican",
        rating: 4.5,
        status: "open",
        currentLocation: "Downtown Park",
        description: "Authentic street tacos made fresh daily",
        hours: "11:00 AM - 8:00 PM",
        phone: "(555) 123-4567",
        specialties: ["Fish Tacos", "Carnitas", "Vegetarian Bowl"],
        nextLocation: "Business District",
        estimatedArrival: "4:00 PM",
        isMoving: false
    },
    {
        id: 2,
        name: "Burger Bonanza",
        cuisine: "American", 
        rating: 4.2,
        status: "closed",
        currentLocation: "University Campus",
        description: "Gourmet burgers with locally sourced ingredients",
        hours: "12:00 PM - 9:00 PM",
        phone: "(555) 234-5678",
        specialties: ["BBQ Bacon Burger", "Veggie Deluxe", "Sweet Potato Fries"],
        nextLocation: "City Center",
        estimatedArrival: "11:00 AM",
        isMoving: false
    },
    {
        id: 3,
        name: "Pizza on Wheels",
        cuisine: "Italian",
        rating: 4.7,
        status: "moving",
        currentLocation: "En route to Mall",
        description: "Wood-fired pizza made to order",
        hours: "11:30 AM - 10:00 PM", 
        phone: "(555) 345-6789",
        specialties: ["Margherita", "Pepperoni Supreme", "Veggie Delight"],
        nextLocation: "Shopping Mall",
        estimatedArrival: "2:00 PM",
        isMoving: true
    },
    {
        id: 4,
        name: "Sweet Dreams Desserts",
        cuisine: "Desserts",
        rating: 4.8,
        status: "open",
        currentLocation: "City Center",
        description: "Artisan ice cream and fresh pastries",
        hours: "1:00 PM - 11:00 PM",
        phone: "(555) 456-7890", 
        specialties: ["Salted Caramel Ice Cream", "Fresh Donuts", "Milkshakes"],
        nextLocation: "Concert Hall",
        estimatedArrival: "6:00 PM",
        isMoving: false
    }
];

// Sample schedule data
const truckSchedules = {
    1: { 
        truckId: 1,
        truckName: "Taco Paradise",
        schedule: [
            {
                day: "Monday",
                location: "Downtown Park", 
                hours: "11:00 AM - 3:00 PM"
            },
            {
                day: "Monday",
                location: "Business District",
                hours: "4:00 PM - 8:00 PM"
            },
            {
                day: "Tuesday", 
                location: "University Campus",
                hours: "11:00 AM - 8:00 PM"
            },
            {
                day: "Wednesday",
                location: "City Center",
                hours: "11:00 AM - 6:00 PM"
            },
            {
                day: "Thursday",
                location: "Shopping Mall",
                hours: "12:00 PM - 8:00 PM"
            },
            {
                day: "Friday",
                location: "Downtown Park",
                hours: "11:00 AM - 9:00 PM"
            }
        ]
    },
    2: { 
        truckId: 2,
        truckName: "Burger Bonanza", 
        schedule: [
            {
                day: "Monday",
                location: "University Campus",
                hours: "12:00 PM - 9:00 PM"
            },
            {
                day: "Tuesday",
                location: "Business District", 
                hours: "11:00 AM - 3:00 PM"
            },
            {
                day: "Tuesday",
                location: "City Center",
                hours: "4:00 PM - 9:00 PM"
            },
            {
                day: "Wednesday",
                location: "Shopping Mall",
                hours: "12:00 PM - 9:00 PM"
            },
            {
                day: "Thursday",
                location: "Downtown Park",
                hours: "11:00 AM - 8:00 PM"
            },
            {
                day: "Friday",
                location: "Concert Hall",
                hours: "5:00 PM - 11:00 PM"
            }
        ]
    },
    3: { 
        truckId: 3,
        truckName: "Pizza on Wheels",
        schedule: [
            {
                day: "Monday",
                location: "Shopping Mall",
                hours: "11:30 AM - 6:00 PM"
            },
            {
                day: "Monday", 
                location: "Concert Hall",
                hours: "7:00 PM - 10:00 PM"
            },
            {
                day: "Tuesday",
                location: "City Center",
                hours: "11:30 AM - 10:00 PM"
            },
            {
                day: "Wednesday",
                location: "University Campus",
                hours: "11:30 AM - 9:00 PM"
            },
            {
                day: "Thursday",
                location: "Business District",
                hours: "11:30 AM - 7:00 PM"
            },
            {
                day: "Friday",
                location: "Downtown Park",
                hours: "11:30 AM - 10:00 PM"
            }
        ]
    },
    4: { 
        truckId: 4,
        truckName: "Sweet Dreams Desserts",
        schedule: [
            {
                day: "Monday",
                location: "City Center",
                hours: "1:00 PM - 11:00 PM"
            },
            {
                day: "Tuesday",
                location: "Concert Hall", 
                hours: "2:00 PM - 11:00 PM"
            },
            {
                day: "Wednesday",
                location: "Shopping Mall",
                hours: "1:00 PM - 10:00 PM"
            },
            {
                day: "Thursday",
                location: "University Campus",
                hours: "1:00 PM - 11:00 PM"
            },
            {
                day: "Friday",
                location: "Business District",
                hours: "1:00 PM - 9:00 PM"
            },
            {
                day: "Saturday",
                location: "Downtown Park",
                hours: "12:00 PM - 11:00 PM"
            }
        ]
    }
};

// Export the data so other files can use it
module.exports = {
    foodTrucks,
    truckSchedules
};