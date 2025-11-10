const express = require('express');
const router = express.Router();
const { db } = require('../data/mockDb');
const { authenticateToken, authorize } = require('../middleware/auth');

// Apply authentication to all routes in this file
router.use(authenticateToken);

// GET /api/admin/users
router.get('/users', authorize('users:manage'), (req, res) => {
    res.json({ 
        message: 'Admin access granted.', 
        totalUsers: db.users.length,
        users: db.users.map(u => ({ id: u.id, username: u.username, role: u.role }))
    });
});

module.exports = router;