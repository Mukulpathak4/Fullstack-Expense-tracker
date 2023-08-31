const Sequelize = require('sequelize');
const sequelize = new Sequelize('fullstackexpensetracker','root','spsushila',{
  dialect :'mysql',
  host:'localhost'
});

module.exports=sequelize;