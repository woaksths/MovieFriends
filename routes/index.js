var express = require('express');
var router = express.Router();
var Movie = require('../models/movie')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/movie/:id', function (req, res, next) {
  var movieId = req.params.id;
  Movie.findOne({
    where: {
      id: movieId,
    }
  }).then((movie) => {
    res.json({movie});
  });
})

module.exports = router;
