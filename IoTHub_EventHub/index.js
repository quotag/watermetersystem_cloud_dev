const {MongoClient} = require('mongodb');

module.exports = async function (context, IoTHubMessages) {
    const uri = process.env.AZURECOSMOSDBCONNECTIONSTRING;
    const client = new MongoClient(uri);
    
    try {
        var dbName = "watersystemdb";
        var collectionName = "waterdata";

        context.log(`JavaScript eventhub trigger function called`);
 
        await client.connect();
        context.log('MongoClient connected');

        const collection = client.db(dbName).collection(collectionName);
        context.log('MongoClient collection retreived');

        for (const message of IoTHubMessages) {
            await collection.insertOne(message);
            context.log(`Inserted message`);
        }
        
    } catch (e) {
        context.log(`Error ${e}`);
    }

    finally {
        client.close();
    }

    context.log('Done called');
    context.done();
};
