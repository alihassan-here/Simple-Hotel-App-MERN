const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');
const Room = require('../models/room.model');

const moment = require('moment');

router.post('/bookroom', async (req, res) => {
    const { room, userId, fromDate, toDate, totalAmount, totalDays } = req.body;

    try {
        const booking = await Booking.create({
            room: room.name,
            roomId: room._id,
            userId,
            fromDate: moment(fromDate).format('DD-MM-YYYY'),
            toDate: moment(toDate).format('DD-MM-YYYY'),
            totalAmount,
            totalDays,
            transactionId: '1234'
        })
        const roomTemp = await Room.findOne({ _id: room._id });
        roomTemp.currentbookings.push({
            bookingId: booking._id,
            fromDate: moment(fromDate).format('DD-MM-YYYY'),
            toDate: moment(toDate).format('DD-MM-YYYY'),
            userId,
            status: booking.status
        });
        await roomTemp.save();
        res.status(200).send('Room Booked Successfully!')
    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;
