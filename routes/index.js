var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

router.get('/movie/genres/:genre', function (req, res, next) {
  var genres = req.params.genre;
  console.log(genres);
  Movie.findAll({
    where: {
      genres: {
        [Op.like]: '%' + genres + '%'
      }
    }
  }).then(function (movie) {
    let node = []
    for (let i = 0; i < movie.length; i++) {
      node.push(movie[i]['dataValues']['id']);
    }
    res.send({node});
  });
})

module.exports = router;
