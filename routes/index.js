var express = require('express');
var router = express.Router();
var passport = require('passport');
let User = require('../models/user');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function index(req, res) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  User.find(modelQuery, function(err, users) {
    if (err) return next(err);
    res.render('index', {
      title: '',
      users,
      user: req.user,
      name: req.query.name,
    });
  });
})


router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email']}
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/podcasts',
    failureRedirect: '/'
  }
));
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
