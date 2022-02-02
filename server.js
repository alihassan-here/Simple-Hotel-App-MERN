const express = require('express');
const app = express();
require('dotenv').config();
require('./db');

//Routes
const roomsRoute = require('./routes/roomRoute');
const userRoute = require('./routes/userRoute');
const bookingRoute = require('./routes/bookingRoute');

//middleware
app.use(express.json());

app.use('/api/rooms', roomsRoute);
app.use('/api/users', userRoute);
app.use('/api/booking', bookingRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));