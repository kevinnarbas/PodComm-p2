var Podcast = require('../models/podcast')

module.exports = {
  create,
}

function create(req, res) {
  Podcast.findById(req.params.id, function(err, podcasts) {
    podcasts.reviews.push(req.body)
    podcasts.save(function(err) {
      res.redirect(`podcasts/${podcasts._id}`)
    });
  });
}