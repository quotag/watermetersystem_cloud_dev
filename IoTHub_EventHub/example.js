module.exports = function (context, IoTHubMessage) {
    try {
        var dbName = "iot";
        var collectionName = "messages";

        context.log(`JavaScript eventhub trigger function called for message array: ${IoTHubMessage}`);
        var mongoClient = require("mongodb").MongoClient;
        context.log('MongoClient created');

        mongoClient.connect("<YOUR_CONNECTION_STRING>", { useNewUrlParser: true, authSource: dbName }, function (err, client) {

            if (err) {
                context.log(`Error occurred while connecting to DB ${err}`)
            } else {
                context.log('MongoClient connected to DB');
            }

            var collection = client.db(dbName).collection(collectionName);
            context.log('MongoClient collection retreived');
            collection.insertOne(IoTHubMessage, { w: 1 });
            //collection.insertOne({"testKey": 13.56}, {w: 1});
            client.close();
            context.log(`Saved message: ${IoTHubMessage}`);
            context.done();
        });

    } catch (e) {
        context.log(`Error ${e}`);
    }

    context.log('Done called');
    context.done();
};