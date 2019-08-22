var Podcast = require('../models/podcast');

module.exports = {
  index,
}

function index(req, res) {
  res.render('podcasts/index', {title: 'PodComm'});
}