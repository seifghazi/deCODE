/**
 * Anything and everything related to mongo.
 * Initialized in app.js and then client can then be reused in other modules
 */

const MongoClient = require('mongodb').MongoClient;

// get DB password, throw error if missing
const password = process.env.DB_PASSWORD
if (!password) {
    throw Error("Export db password: \"DB_PASSWORD\" is missing")
}

const uri = `mongodb+srv://decode:${password}@cluster0.xmdbc.mongodb.net/test?retryWrites=true&w=majority`;
const client = MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { client }
