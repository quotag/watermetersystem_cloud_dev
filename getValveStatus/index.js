const { db } = require('../lib/mongoConnection');

module.exports = async function (context, req) {
    try {
        var collectionName = "valve_set_status";

        const collection = db.collection(collectionName);
        let result = await collection.findOne({deviceId: req.params.id})
        if (!result) {
            return context.res = {
                status: 400,
                body: "deviceId not found or empty"
            };
        }
        return context.res = {
            status: 200,
            body: result.valveSetStatus,
        };

    } catch (e) {
        context.log(`Error ${e}`);
    }

    context.log('Done called');
    context.done();
};
