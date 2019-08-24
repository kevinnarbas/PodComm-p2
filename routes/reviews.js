var express = require('express');
var router = express.Router();
var reviewsCtrl = require('../controllers/reviews');

router.post('/podcasts/:id/reviews', reviewsCtrl.create)




module.exports = router;