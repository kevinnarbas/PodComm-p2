var express = require('express');
var router = express.Router();
var podcastCtrl = require('../controllers/podcasts');


router.get('/',isLoggedIn, podcastCtrl.index);
router.get('/new',isLoggedIn, podcastCtrl.new);
router.get('/search',isLoggedIn, podcastCtrl.search);
router.get('/:id',isLoggedIn, podcastCtrl.show);
router.post('/',isLoggedIn, podcastCtrl.create);
router.delete('/:id', isLoggedIn, podcastCtrl.delPod);




function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;