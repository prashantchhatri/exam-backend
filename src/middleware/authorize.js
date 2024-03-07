function authorize(allowedRoles) {
    return (req, res, next) => {
        console.log('req.user:', req.user); // Add this line
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}


module.exports = authorize;
