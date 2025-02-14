const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.models');

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Compare passwords
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, name: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,  // Must be true for cross-origin cookies
            sameSite: "None", // Allows cross-site requests
        });

        // Send token in response
        res.json({ msg: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

// A route for logging out 
router.post('/logout', (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,  // Ensure it's true for production (HTTPS)
        sameSite: "None" // Allows cross-origin cookie deletion
    });

    res.json({ msg: "Logout successful" });
});

// A route for verifying profile
router.get("/profile", async (req, res) => {
    try {
        const token = req.cookies.token; // Get token from cookies

        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB
        const user = await userModel.findById(decoded.id).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        return res.status(402).json({ msg: "Unauthorized: Invalid token" });
    }
});


module.exports = router;
