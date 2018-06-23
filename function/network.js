const fs = require('fs');
const _ = require('lodash');
const math = require('mathjs')
const csv = fs.readFileSync('./result.csv').toString().split('\n');
const raws = _.drop(csv);
const matrix = _.map(raws, raw => _.chain(raw).split(',').drop().map(d => d * 1).value());
const matrixT = _.zip.apply(_, matrix);
const movieId = _.drop(csv[0].split(','));
const Movie = require('../models/movie');

function multiplyMatrices(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
    throw new Error('arguments should be in 2-dimensional array format');
  }
  var x = a.length,
    z = a[0].length,
    y = b[0].length;

  if (b.length !== z) {
    throw new Error('number of columns in the first matrix != the number of rows in the second');
  }

  var productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
  var product = new Array(x);
  for (var p = 0; p < x; p++) {
    product[p] = productRow.slice();
  }
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      for (var k = 0; k < z; k++) {
        product[i][j] += a[i][k] * b[k][j];
        console.log(product[i][j]);
      }
    }
  }
  return product;
}

console.log(matrixT.length, matrixT[0].length);
console.log(matrix.length, matrix[0].length);


var edge = multiplyMatrices(matrix, matrixT);
var edgeList = [];
var nodeList = [];
for (var i = 0; i < edge.length; i++) {
  for (var j = 0; j <= i; j++) {
    var path = {
      'from': movieId[i],
      'to': movieId[j],
      'weight': edge[j][i]
    }
    if (path.weight >= 1 && path.from != path.to) {
      edgeList.push(path);
    }
  }
}

for (var i = 0; i < movieId.length; i++) {
  let genre = "";
  Movie.findOne({
    where: {
      id: movieId[i]
    }
  }).then(function (movie) {
    genre = movie['dataValues'].genres
  });
  nodeList.push({
    id: movieId[i],
    name: movieId[i] + ' mName',
    size: edge[i][i],
    genres: genre,
  })
}

fs.writeFileSync('../public/data/edges.js', `var edges = ${JSON.stringify(edgeList)};`);
fs.writeFileSync('../public/data/nodes.js', `var nodes = ${JSON.stringify(nodeList)};`);