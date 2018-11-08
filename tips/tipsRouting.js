const router = require('express').Router();
const tipsController = require('./tipsController.js');

router.get('/all', tipsController.getAllTips);
router.post('/add', tipsController.saveTip);
router.delete('/:id', tipsController.deleteTip);

module.exports = router;