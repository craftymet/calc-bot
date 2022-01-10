const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

module.exports = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    return mongoose;
}
