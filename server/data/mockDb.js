const { ROLES } = require('../config/roles');

// The shared data store
let db = {
    users: [],
    posts: []
};

const seedDatabase = () => {
    console.log('--- Seeding In-Memory Database ---');
    
    db.users = [
        { id: 'u1', username: 'admin_ravi', password: 'password', role: ROLES.ADMIN },
        { id: 'u2', username: 'editor_rishu', password: 'password', role: ROLES.EDITOR },
        { id: 'u3', username: 'editor_ayush', password: 'password', role: ROLES.EDITOR },
        { id: 'u4', username: 'viewer_devesh', password: 'password', role: ROLES.VIEWER },
    ];

    db.posts = [
        { id: 1, title: 'Admin Global Policy', content: 'Only admins can manage this.', authorId: 'u1', status: 'published', authorName: 'Admin Ravi' },
        { id: 2, title: 'rishu\'s Published Article', content: 'A general public post.', authorId: 'u2', status: 'published', authorName: 'Editor Rishu' },
        { id: 3, title: 'ayush\'s Draft Idea', content: 'This is a private draft.', authorId: 'u2', status: 'draft', authorName: 'Editor Ayush' },
        { id: 4, title: 'devesh\'s New Draft', content: 'Needs review before publishing.', authorId: 'u3', status: 'draft', authorName: 'Editor Rishu' },
        { id: 5, title: 'Viewer Public News', content: 'Public news post for all.', authorId: 'u4', status: 'published', authorName: 'Viewer Devesh' },
    ];
    console.log(`Database seeded with ${db.users.length} users and ${db.posts.length} posts.`);
};

module.exports = { db, seedDatabase };