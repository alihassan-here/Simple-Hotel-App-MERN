const express = require("express");
const router = express.Router();

const User = require("../models/user.model");


router.post("/register", async (req, res) => {
    const newUser = new User(req.body);
    try {
        const user = await newUser.save();
        res.send('User Registered successfully!');
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            return res.send(user);
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});

module.exports = router;
