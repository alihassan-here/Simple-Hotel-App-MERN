const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URI, {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
});
let connection = mongoose.connection;
connection.on('error', err => {
    console.log("MONGODB connection failed");
})
connection.on('connected', err => {
    console.log("MONGODB connection Successful1");
})
module.exports = mongoose;