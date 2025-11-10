const express = require('express');
const router = express.Router();
const { db } = require('../data/mockDb');
const { ROLES } = require('../config/roles');
const { authenticateToken, authorize } = require('../middleware/auth');

router.use(authenticateToken);

// GET /api/posts - Implements Data Scoping
router.get('/', (req, res) => {
    const { role, userId } = req.user;
    let filteredPosts = [];

    if (role === ROLES.ADMIN || role === ROLES.VIEWER) {
        filteredPosts = db.posts.filter(p => p.status === 'published');
    } else if (role === ROLES.EDITOR) {
        // Editors see all published + their own drafts
        filteredPosts = db.posts.filter(p => 
            p.status === 'published' || (p.authorId === userId && p.status === 'draft')
        );
    }

    res.json({ posts: filteredPosts });
});

// POST /api/posts - Basic Role Check
router.post('/', authorize('posts:create'), (req, res) => {
    const newPost = {
        id: db.posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        authorId: req.user.userId,
        status: req.user.role === ROLES.ADMIN ? 'published' : 'draft',
        authorName: req.user.role.charAt(0).toUpperCase() + req.user.role.slice(1) + " User" // Better name
    };
    db.posts.push(newPost);
    res.status(201).json({ message: 'Post created', post: newPost });
});

// PUT /api/posts/:id - Implements Row-Level Security
router.put('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { role, userId } = req.user;
    
    const postIndex = db.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
    
    const post = db.posts[postIndex];

    // Row-Level Check: Admin can update anything; Editor can only update their own.
    const isOwner = post.authorId === userId;
    // Check: Admin always ok OR Editor AND owner ok
    if ((role === ROLES.ADMIN && req.user.role === ROLES.ADMIN) || (role === ROLES.EDITOR && isOwner)) {
         db.posts[postIndex] = { ...post, ...req.body, updatedAt: new Date() };
         return res.json({ message: 'Post updated', post: db.posts[postIndex] });
    }

    res.status(403).json({ message: 'Forbidden: You do not own this post.' });
});

// DELETE /api/posts/:id - Admin only (NEW)
router.delete('/:id', authorize('posts:delete_all'), (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = db.posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found.' });
    }

    // Remove from array
    db.posts.splice(postIndex, 1);
    res.json({ message: `Post ${postId} deleted successfully.` });
});

module.exports = router;