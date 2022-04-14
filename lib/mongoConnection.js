const {MongoClient} = require('mongodb');

const uri = process.env.AZURECOSMOSDBCONNECTIONSTRING;
const dbName = process.env.DB_NAME || "watersystemdb";

const client = new MongoClient(uri);
client.connect();
exports.db = client.db(dbName)
