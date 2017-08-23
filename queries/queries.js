const knex = require('../knex');
module.exports.getAllSeries = function(){
  return knex('series')
  .select('*')
  .then(function(seriesData){
    return seriesData;
  });
};
