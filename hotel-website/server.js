const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Load mock room data
const rooms = require('./rooms.json');

// Middleware to serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse JSON bodies (for booking form)
app.use(express.json());

// --- API Endpoints ---
// GET all rooms
app.get('/api/rooms', (req, res) => {
    res.json(rooms);
});

// POST a new booking
app.post('/api/book', (req, res) => {
    const { roomType, checkIn, checkOut, guests } = req.body;

    console.log('--- New Booking Request ---');
    console.log('Room Type:', roomType);
    console.log('Check-in Date:', checkIn);
    console.log('Check-out Date:', checkOut);
    console.log('Number of Guests:', guests);

    res.status(200).json({ 
        success: true, 
        message: `Booking confirmed for ${roomType}. A confirmation email has been sent.` 
    });
});


// --- Page Serving ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/rooms', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'rooms.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gallery.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'booking.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});