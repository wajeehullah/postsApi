const mongoose = require('mongoose');
const appConstants = require('../constants/appConstants');
const connect = async () => {
    try {
        const conn = await mongoose.connect(appConstants.mongodb.connectionString, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log("Connected to DB ", conn.connection.host, appConstants.mongodb.connectionString);
    } catch (ex) {
        console.log("failed to connect to db", ex);
    }
}

module.exports = connect;