const router = require('express').Router();
const tipsRouting = require('./tips/tipsRouting.js');

router.use('/tips', tipsRouting);

module.exports = router;