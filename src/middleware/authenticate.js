// const User = require('../models/userModel'); 


const jwt = require('jsonwebtoken');

async function authenticate(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    // console.log("Extracted Token:", token);
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Access denied. User not found.' });
        }
        req.user = user;
        next();
    } catch (err) {
        // console.error(err); 
        next(err); 
    }
}



module.exports = authenticate;
