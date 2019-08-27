var express = require('express');
var router = express.Router();
var podcastCtrl = require('../controllers/podcasts');


router.get('/',isLoggedIn, podcastCtrl.index);
router.get('/new',isLoggedIn, podcastCtrl.new);
router.get('/search',isLoggedIn, podcastCtrl.search);
router.get('/:id',isLoggedIn, podcastCtrl.show);
router.get('/:id/edit', isLoggedIn, podcastCtrl.edit),
router.post('/',isLoggedIn, podcastCtrl.create);
router.put('/:id', isLoggedIn, podcastCtrl.update);
router.delete('/:id', isLoggedIn, podcastCtrl.delPod);




function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;