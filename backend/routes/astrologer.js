const express = require("express");
const jwt = require("jsonwebtoken");
const astro = require("../models/astrologer"); // This is our astrologer as admin
const router = express.Router();
const bcrypt = require('bcrypt');

// @desc Register astrologer (admin)
// @access Public
router.post("/signup", async (req, res) => {
    try {
        const {
            firstName, lastName, age, gender, skills, language,
            experience, price, about, emailId, password
        } = req.body;

        const exists = await astro.findOne({ emailId });
        if (exists) {
            return res.status(400).json({ message: "Astrologer already exists" });
        }

        const astrologer = new astro({
            firstName, lastName, age, gender, skills, language,
            experience, price, about, emailId, password, role: "admin"
        });

        await astrologer.save();

        const payload = { user: { id: astrologer._id, role: astrologer.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;
            res.status(201).json({
                user: {
                    _id: astrologer._id,
                    name: `${astrologer.firstName} ${astrologer.lastName || ""}`.trim(),
                    emailId: astrologer.emailId,
                    role: astrologer.role
                },
                token
            });
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc Login astrologer (admin)
// @access Public
router.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await astro.findOne({ emailId });
        if (!user) {
            return res.status(400).json({ message: "Invalid user and password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({ message: "Invalid Credentials" });

        const payload = { user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;
            res.json({
                user: {
                    _id: user._id,
                    name: `${user.firstName} ${user.lastName || ""}`.trim(),
                    emailId: user.emailId,
                    role: user.role
                },
                token
            });
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
