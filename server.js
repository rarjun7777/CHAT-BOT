const express = require('express');
const path = require('path');
const { connectDB } = require('./db');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Save chat message
app.post('/api/chat-history', async (req, res) => {
    try {
        const db = await connectDB();
        const { user, message, response, timestamp } = req.body;
        await db.collection('chats').insertOne({ user, message, response, timestamp: timestamp || new Date() });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get chat history
app.get('/api/chat-history', async (req, res) => {
    try {
        const db = await connectDB();
        const chats = await db.collection('chats').find({}).sort({ timestamp: 1 }).toArray();
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Clear chat history
app.delete('/api/chat-history', async (req, res) => {
    try {
        const db = await connectDB();
        await db.collection('chats').deleteMany({});
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 