var Podcast = require('../models/podcast');

module.exports = {
  index,
}

function index(req, res) {
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    let sortKey = req.query.sort || 'name';
    Podcast.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
      if (err) return next(err);
      res.render('podcasts/index', {
        title: 'PodComm',
        users,
        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
}