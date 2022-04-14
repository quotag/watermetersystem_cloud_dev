const { db } = require('../lib/mongoConnection');

module.exports = async function (context, req) {
    try {
        var collectionName = "waterdata";

        const collection = db.collection(collectionName);
        let list = await collection.find({userId: req.params.id}).toArray()
        if (!list.length) {
            return context.res = {
                status: 400,
                body: "user id not found or empty"
            };
        }
        return context.res = {
            status: 200,
            body: list,
        };

    } catch (e) {
        context.log(`Error ${e}`);
    }

    context.log('Done called');
    context.done();
};
