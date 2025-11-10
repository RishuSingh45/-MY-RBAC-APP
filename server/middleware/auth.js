const jwt = require('jsonwebtoken');
const { PERMISSIONS_MATRIX } = require('../config/roles');

// In a real app, use process.env.JWT_SECRET
const SECRET_KEY = 'super_secret_capstone_key_2024';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
        // Verify token and attach payload to request
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

const authorize = (requiredPermission) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        const permissions = PERMISSIONS_MATRIX[userRole] || [];

        if (permissions.includes(requiredPermission)) {
            next();
        } else {
            console.warn(`AUTH DENIED: User ${req.user.userId} (${userRole}) attempted ${requiredPermission}`);
            return res.status(403).json({ message: `Forbidden: Missing permission ${requiredPermission}` });
        }
    };
};

module.exports = { authenticateToken, authorize, SECRET_KEY };