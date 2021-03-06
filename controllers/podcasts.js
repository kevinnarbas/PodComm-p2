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
    res.render('podcasts/index', {
        title: 'Your Homepage',
        user: req.user,
        peas,
    });
  });
}

function newPodcast(req, res) {
    res.render('podcasts/new', {
        title: 'Add A Pea To Your Pod Here!',
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
            res.redirect('/podcasts');
        });
    });
} 

function show(req, res) {
    Podcast.findById(req.params.id, function(err, podcasts) {
        res.render('podcasts/show', {
            podcasts,
            title: '',
            user: req.user
        });
    });
}

function search(req, res, next) {
    let modelQuery = req.query.podTitle ? {title: new RegExp(req.query.podTitle, 'i')} : {};
    Podcast.find(modelQuery, function(err, podcasts) {
        if (err) return next(err);
        res.render('podcasts/search', { 
            podcasts, 
            title: 'Search Page',
            user: req.user,
            podTitle: req.query.podTitle,
        });
    });
}

function delPod(req, res) {
    Podcast.findByIdAndDelete(req.params.id, function(err) {
        User.findById(req.user._id, function(err, user) {
            var podIdx = user.podcasts.indexOf(req.params.id)
            user.podcasts.splice(podIdx, 1);
            user.save(function(err) {
                res.redirect('/podcasts')
            });
        });
    });
}

function edit(req, res) {
    Podcast.findById(req.params.id, function(err, podcasts) {
        res.render('podcasts/edit', {
        podcasts, 
        title: 'Genetically Modify Your Pea',
        user: req.user,
        });
    });
}

function update(req, res) {
    Podcast.findByIdAndUpdate(req.params.id, req.body).then(function(podcast) {
        res.redirect(`/podcasts/${podcast._id}`);
    });

}