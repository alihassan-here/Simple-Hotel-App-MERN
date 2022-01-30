const express = require('express');
const router = express.Router();

const Room = require('../models/room.model');

router.get('/getallrooms', async (req, res) => {
    try {
        await Room.find({}).limit(10).exec((err, room) => {
            if (err) console.log(err);
            res.status(200).json({ room })
        })
        // return res.json({ msg: 'get all rooms', room });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
router.post('/getroombyid', async (req, res) => {
    const roomid = req.body.roomid;
    try {
        const room = await Room.findOne({ _id: roomid });
        res.send(room);
        // return res.json({ msg: 'get all rooms', room });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

module.exports = router;