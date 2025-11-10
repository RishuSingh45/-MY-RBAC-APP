const express = require('express');
const cors = require('cors');
const { seedDatabase } = require('./data/mockDb');

const app = express();
const port = 3001;

// --- Middleware ---
app.use(express.json());
// Enable CORS for your Vite frontend port
app.use(cors({ origin: 'http://localhost:5173' }));

// --- Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/posts', require('./routes/posts'));

// --- Initialization ---
seedDatabase();
app.listen(port, () => {
    console.log(`Modular RBAC Server running on http://localhost:${port}`);
});