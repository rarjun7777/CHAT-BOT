const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Arjun:5YJrNMjpUY9nB9nX@cluster0.f0emx94.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
    return client.db('chatgptbot'); // Use your desired DB name
}

module.exports = { connectDB }; 