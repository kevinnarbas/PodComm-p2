var Podcast = require('../models/podcast');
var User = require('../models/user');

module.exports = {
  index,
  new: newPodcast,
  search,
  create,
  show,
  search,
  delPod,
  update,
  edit,
}

function index(req, res) {
  User.findById(req.user._id).populate('podcasts').exec(function(err, peas) {
    console.log(peas);
    res.render('podcasts/index', {
        title: 'Your Homepage',
        user: req.user,
        peas,
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
    req.user.podcasts.push(podcast._id);
    podcast.save(function(err) {
        req.user.save(function(err) {
            console.log(podcast);
            console.log(podcast._id)
            console.log(req.user)
            res.redirect('/podcasts');
        });
    });
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
        console.log('looky here',podcasts);
        res.render('podcasts/search', { 
            podcasts, 
            title: 'PodComm',
            user: req.user,
            podTitle: req.query.podTitle,
        });
    });
    console.log(modelQuery)
}

function delPod(req, res) {
    Podcast.findByIdAndDelete(req.params.id, function(err) {
        User.findById(req.user._id, function(err, user) {
            var podIdx = user.podcasts.indexOf(req.params.id)
            user.podcasts.splice(podIdx, 1);
            user.save(function(err) {
                console.log(podIdx)
                console.log('look here', req.user);
                res.redirect('/podcasts')
            });
        });
    });
}

function edit(req, res) {
    Podcast.findById(req.params.id, function(err, podcasts) {
        res.render('podcasts/edit', {
        podcasts, 
        title: 'PodComm',
        user: req.user,
        });
    });
}

function update(req, res) {
    Podcast.findByIdAndUpdate(req.params.id, req.body).then(function(podcast) {
        res.redirect(`/podcasts/${podcast._id}`);
    });

}