const tipsCollection = require('../databaseConfig.js').getInstance().collection('tips');
const ObjectId = require('mongodb').ObjectID;

module.exports.insert = function(data, callback) {
    tipsCollection.insertOne(data, (err, tipDoc) => {
        if(err) console.log(err);
        const savedTip = JSON.stringify(tipDoc.ops[0]);
        callback(savedTip);
    })
};

module.exports.findAll = function(callback) {
    tipsCollection.find((err, allTipsPromise) => {
        if(err) console.log(err);
        allTipsPromise.toArray().then(allTips => callback(JSON.stringify(allTips)));
    });
};

module.exports.delete = function(id, callback) {
    tipsCollection.deleteOne({"_id": ObjectId(id)}, (err, _) => {
        if(err) console.log(err);
        callback();
    });
}