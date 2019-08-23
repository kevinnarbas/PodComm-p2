var Podcast = require('../models/podcast');
var User = require('../models/user');

module.exports = {
  index,
  new: newPodcast,
  search,
  create,
}

function index(req, res) {
  User.find({}, function(err, users) {
    if (err) return next(err);
    res.render('podcasts/index', {
      title: 'PodComm',
      users,
      user: req.user,
    });
  });
}

function newPodcast(req, res) {
  User.find({}, function(err, users) {
    res.render('podcasts/new', {
        title: 'PodComm',
        users,
        user: req.user,
    });
  });
}

function search(req, res) {
    User.find({}, function(err, users) {
        console.log(req.user)
        res.render('podcasts/search', {
            title: 'PodComm',
            users,
            user: req.user,
        })
    })
}

function create(req, res) {
    User.find({}, function(err, users) {
        console.log(req.user)
        for (let key in req.body) {
            if (req.body[key] === '') delete req.body[key];
        }
        var podcast = new Podcast(req.body)
        podcast.save(function(err) {
            console.log(podcast);
            res.redirect('/podcasts');
        });
    });
}