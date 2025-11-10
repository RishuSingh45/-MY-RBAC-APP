const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { db } = require('../data/mockDb');
const { SECRET_KEY } = require('../middleware/auth');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // In a real app: bcrypt.compare(password, user.hash)
    const user = db.users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token with vital RBAC claims
    const token = jwt.sign(
        { userId: user.id, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    res.json({ 
        message: 'Login successful', 
        token,
        role: user.role,
        userId: user.id
    });
});

module.exports = router;