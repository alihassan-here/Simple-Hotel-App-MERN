const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');
const Room = require('../models/room.model');

const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51KUDthEm7PEDC4IWikl6knefk3wVLECUUj7y8JoDMPalrZMXE3fQuEFLJC9le696ZjEo56LDJyMEjDmGDCAYxhJ400LPcaL35g');

router.post('/bookroom', async (req, res) => {
    const { room, userId, fromDate, toDate, totalAmount, totalDays, token } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const payment = await stripe.charges.create({
            amount: totalAmount * 150,
            currency: 'pkr',
            customer: customer.id,
            receipt_email: token.email,
            description: 'Booking Room'
        }, {
            idempotencyKey: uuidv4()
        });
        if (payment) {
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

        }
        res.send('Payment Successful');
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error });
    }




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
