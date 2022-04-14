const { db } = require('../lib/mongoConnection');

module.exports = async function (context, IoTHubMessages) {
    try {
        var collectionName = "waterdata";

        context.log(`JavaScript eventhub trigger function called`);

        const collection = db.collection(collectionName);
        context.log('MongoClient collection retreived');

        for (const message of IoTHubMessages) {
            await collection.insertOne(message);
            context.log(`Inserted message`);
        }
        
    } catch (e) {
        context.log(`Error ${e}`);
    }

    context.log('Done called');
    context.done();
};
