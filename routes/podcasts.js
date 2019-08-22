var express = require('express');
var router = express.Router();
var podcastCtrl = require('../controllers/podcasts');


router.get('/', podcastCtrl.index);

module.exports = router;