const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'movie',
  'root',
  '1234',
  {
    'host': 'localhost',
    'dialect': 'mysql'
  }
);

sequelize.sync().then(()=>{
  console.log('Databases sync')
});
module.exports = sequelize;