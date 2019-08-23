var express = require('express');
var router = express.Router();
var podcastCtrl = require('../controllers/podcasts');


router.get('/', podcastCtrl.index);
router.get('/new', podcastCtrl.new);
router.get('/search', podcastCtrl.search);
router.post('/', podcastCtrl.create);


module.exports = router;