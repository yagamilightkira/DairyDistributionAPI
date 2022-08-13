require('dotenv').config()
let mongoose = require('mongoose');
const { MONGO_IP } = require('../constants/constants')

mongoose.Promise = global.Promise;
mongoose.connect( process.env.DB_URL || MONGO_IP, { connectTimeoutMS: 5000 }, function (error) {
    console.log('Mongoose connected to MongoDB hosted at', MONGO_IP, "Errors:", error);
})

module.exports = { mongoose };
