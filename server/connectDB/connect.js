const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async (URI) => {
    try {
        await mongoose.connect(URI);
        console.log("✅ Connected to the database successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // stop server if DB fails
    }
};

module.exports = connectDB;
