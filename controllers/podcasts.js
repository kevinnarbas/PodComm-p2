var Podcast = require('../models/podcast');
var User = require('../models/user');

module.exports = {
  index,
  new: newPodcast,
  search,
  create,
  show,
  search,
}

function index(req, res) {
  Podcast.find({}, function(err, podcasts) {
    if (err) return next(err);
    res.render('podcasts/index', {
        title: 'PodComm',
        user: req.user,
        podcasts,
    });
  });
}

function newPodcast(req, res) {
    res.render('podcasts/new', {
        title: 'PodComm',
        user: req.user,
    });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var podcast = new Podcast(req.body)
    podcast.save(function(err) {
        console.log(podcast);
        res.redirect('/podcasts');
    });
    console.log(req.user)
    
} 

function show(req, res) {
    Podcast.findById(req.params.id, function(err, podcasts) {
        res.render('podcasts/show', {
            podcasts,
            title: 'PodComm',
            user: req.user
        });
        console.log(req.user)
    });
}

function search(req, res, next) {
    let modelQuery = req.query.podTitle ? {title: new RegExp(req.query.podTitle, 'i')} : {};
    Podcast.find(modelQuery, function(err, podcasts) {
        if (err) return next(err);
        res.render('podcasts/search', { 
            podcasts, 
            title: 'PodComm',
            user: req.user,
            podTitle: req.query.podTitle,
        });
    });
    console.log(modelQuery)
    console.log(req.query.podTitle)
  }