const router = require('express').Router();

router.get('', (req, res) => res.redirect('/tips'));
router.get('/tips', (req, res) => res.sendFile(__dirname + '/views/tips/tips.html'));

module.exports = router;