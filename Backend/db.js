require('dotenv').config();
const mongoose = require('mongoose');

const URLDB = process.env.MONGODB_SERVER_URL || 'mongodb://localhost:27017/test';

async function connectToDatabase() {
    try {
        await mongoose.connect(URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Подключен к MongoDB');
    } catch (error) {
        console.error('Не удалось подключиться к MongoDB:', error);
    }
}

module.exports = connectToDatabase;