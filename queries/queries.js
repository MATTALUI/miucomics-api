const knex = require('../knex');


function getAllSeries(){
  return knex('series').select('*').then(function(seriesData){
    return seriesData;
  });
};

function getSeriesIssueCovers(seriesId){
  return knex('issues')
  .where('series_id', seriesId)
  .select('cover_image')
  .then((info)=>{return info});
}

module.exports.getAllSeriesWithImages = function(){
  return getAllSeries().then((allSeries)=>{
    let promises = [];
    allSeries.forEach((series)=>{
      promises.push(getSeriesIssueCovers(series.id));
    });
    return Promise.all(promises).then((covers)=>{
      covers = covers.map((set)=>{
        let coversArray = [];
        set.forEach((cover)=>{coversArray.push(cover.cover_image)});
        return coversArray;
      });
      covers.forEach((seriesCovers, index)=>{
        allSeries[index].issue_covers = seriesCovers;
      })
      return allSeries;
    });
  });
}

module.exports.getAllIssues = function(){
  return knex('issues').select('*').then(issues=>issues);
}
module.exports.getAllStock = function(){
  return knex('stock').select('*').then(issues=>issues);
}
module.exports.meow = function(){
  return getSeriesIssueCovers(1)
}
