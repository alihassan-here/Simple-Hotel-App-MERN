const express = require('express');
const app = express();
require('dotenv').config();
require('./db');

//Routes
const roomsRoute = require('./routes/roomRoute');
const userRoute = require('./routes/userRoute');

//middleware
app.use(express.json());

app.use('/api/rooms', roomsRoute);
app.use('/api/users', userRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));