const knex = require('../knex');


function getAllSeries(){
  return knex('series').select('*').then(function(seriesData){
    return seriesData;
  });
};
function getAllIssues(){
  return knex('issues').select('*').then(issues=>issues);
}

function getSeriesIssueCovers(seriesId){
  return knex('issues')
  .where('series_id', seriesId)
  .select('cover_image')
  .then((info)=>{return info});
}
function getSeriesIssues(seriesId){
  return knex('issues')
  .where('series_id', seriesId)
  .select('*')
  .then(issues=>issues);
}
function getIssueStock(issueId){
  return knex('stock')
  .where('issue_id', issueId)
  .select(['condition','price','quantity'])
  .then(stock=>stock);
}
function getAllStock(){
  return knex('stock').select('*').then(issues=>issues);
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
        if(coversArray.length === 0) coversArray.push('https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg')
        return coversArray;
      });
      covers.forEach((seriesCovers, index)=>{
        allSeries[index].issue_covers = seriesCovers;
      })
      return allSeries;
    });
  });
}

module.exports.getSeriesIssuesWithStockInfo = function(seriesId){
  return getSeriesIssues(seriesId).then(function(issues){
    let promises = [];
    issues.forEach((issue)=>{
      promises.push(getIssueStock(issue.id));
    });
    return Promise.all(promises).then((stockForIssues)=>{
      stockForIssues.forEach((stockList,index)=>{
        issues[index].stock = stockList;
      });
      return issues;
    });
  });
}
module.exports.postNewSeries = function (data){
  return knex('series')
  .insert(data)
  .returning('*')
  .then((newSeries)=>{
    newSeries[0].issue_covers = ['https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg'];
    return newSeries[0];
  });
}
module.exports.deleteSeries = function(seriesId){
  return knex('series')
  .del()
  .where('id', seriesId)
  .returning('*')
  .then(deleted=>deleted);
}
module.exports.postNewIssue = function(data){
  return knex('issues')
  .insert(data)
  .returning('*')
  .then((newIssue)=>{
    return newIssue[0];
  });
}
module.exports.meow = function(){
  return getSeriesIssueCovers(1)
}
