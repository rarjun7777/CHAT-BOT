const { MongoClient } = require('mongodb');


// ADD YOUR MONGODB URL HERE
const uri = '';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
    return client.db('chatgptbot'); // Use your desired DB name
}

module.exports = { connectDB }; 
