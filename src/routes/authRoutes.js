    const express = require('express');
    const router = express.Router();
    const User = require('../models/userModel');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const authorize = require('../middleware/authorize');
    const authenticate = require('../middleware/authenticate');

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user) {
                console.log('User not found');
                return res.status(401).json({ message: 'Authentication failed' });
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.log('Invalid password');
                return res.status(401).json({ message: 'Authentication failed' });
            }
    
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    });
    

    router.post('/register', authenticate, authorize(['admin']), async (req, res) => {
        console.log('hhhh');
        const { username, password, role } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword, role });
            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    module.exports = router;
