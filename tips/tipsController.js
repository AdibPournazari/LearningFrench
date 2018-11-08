const tipsService = require('./tipsService.js');

module.exports.saveTip = function (req, res, next) {
    setHeader(res, 'Content-type', 'application/json');
    tipsService.insert(req.body, (savedTip) => 
        sendResponse(res, savedTip)
    );
}

module.exports.getAllTips = function (req, res, next) {
    setHeader(res, 'Content-type', 'application/json');
    tipsService.findAll((tips) => 
        sendResponse(res, tips)
    );
}

module.exports.deleteTip = function (req, res, next) {
    tipsService.delete(req.params.id, () => 
        sendResponse(res, ""));
}

function setHeader(res, key, value) {
    res.setHeader(key, value);
}

function sendResponse(res, value){
    res.end(value);
}