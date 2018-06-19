var db = require('../util/database')
var Sequelize = require('sequelize');
var Movie = db.define('movie', {
  // original_language,poster_path,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  budget: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genres: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  vote_average: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  vote_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  runtime: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  revenue: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  popularity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = Movie;