var Podcast = require('../models/podcast');
var User = require('../models/user');

module.exports = {
  index,
}

function index(req, res) {
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    User.find(modelQuery, function(err, users) {
      if (err) return next(err);
      res.render('podcasts/index', {
        title: 'PodComm',
        users,
        user: req.user,
        name: req.query.name,
      });
    });
}