const fs = require('fs');
const _ = require('lodash');
const pcorr = require('compute-pcorr');
const correlation = require('correlation-rank');
const math = require('mathjs')
const csv = fs.readFileSync('./test.csv').toString().split('\n');
const raws = _.drop(csv);
const matrix = _.map(raws, raw => _.chain(raw).split(',').drop().map(d => d * 1).value());
const matrixT = _.zip.apply(_, matrix);
const movieId = _.drop(csv[0].split(','));
const edge = math.multiply(matrixT, matrix);

var edgeList = []
var nodeList = []
for (var i = 0; i < edge.length; i++) {
  for (var j = 0; j <= i; j++) {
    var path = {
      'from': movieId[i],
      'to': movieId[j],
      'weight': edge[j][i]
    }
    if (path.weight >= 2) {
      edgeList.push(path);
    }
  }
}

for(var i=0; i<movieId.length; i++){
  nodeList.push({
    id: movieId[i],
    name: movieId[i]+' mName'
  })
}
fs.writeFileSync('../public/data/edges.js', `var edges = ${JSON.stringify(edgeList)};`);
fs.writeFileSync('../public/data/nodes.js', `var nodes = ${JSON.stringify(nodeList)};`);
