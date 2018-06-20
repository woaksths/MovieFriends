var csv = require('csv');
var Movie = require('../models/movie');
var fs = require('fs');

var input = fs.createReadStream('movies_metadata (1).csv');

var parser = csv.parse({
  delimiter: ',',
  columns: true,
  relax: true,
  skip_empty_lines: true,
  trim: true,
})

var transform = csv.transform(function (row) {
    var genres = row['genres'];
    var genreObj = eval(genres);
    var genre = "";
    if (genreObj) {
      for (var i = 0; i < genreObj.length; i++) {
        genre += genreObj[i].name + " "
      }
    }
    var movie = {
      id: row['id'],
      budget: row['budget'],
      genres: genre,
      title: row['title'],
      vote_average: row['vote_average'],
      vote_count: row['vote_count'],
      runtime: row['runtime'],
      revenue: row['revenue'],
      popularity: row['popularity'],
    }
    Movie.create(movie)
      .then(function (m) {

      })
      .catch(function (err) {
      })
  }
)
input.pipe(parser).pipe(transform)
