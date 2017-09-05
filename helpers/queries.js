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
function addStockInfo(stockObject){
  return knex('stock')
  .insert(stockObject)
  .returning('*')
  .then(newStockInfo=>newStockInfo[0]);
}
function buildStockObjects(stockFormRequest){
  let stockObjects = [];
  let issueId = stockFormRequest.issueId;
  const conditions = ['Mint', 'Near Mint','Very Fine', 'Fine','Very Good', 'Good', 'Fair', 'Poor'];
  conditions.forEach((condition)=>{
    let stockObj = {};
    stockObj.condition = condition
    stockObj.issue_id = issueId;
    stockObj.quantity = 0;
    stockObj.price = 0.00;
    stockFormRequest.stockInfo.forEach((reqObj)=>{
      if(reqObj.condition === condition){
        stockObj.quantity += reqObj.quantity;
        stockObj.price = reqObj.price;
      }
    });
    stockObjects.push(stockObj)
  });
  return stockObjects;
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
module.exports.postNewStockInfo = function(stockInfo){
  let promises = [];
  let stockObjects = buildStockObjects(stockInfo);
  stockObjects.forEach((stockObject)=>{
    promises.push(addStockInfo(stockObject));
  });
  return Promise.all(promises).then(allNewStocksArray=>allNewStocksArray);
}
module.exports.decreaseStockQuantity = function(id,{condition}){
  return knex('stock')
  .update('quantity', knex.raw('quantity - 1'))
  .where('condition', condition)
  .where('issue_id', id)
  .returning('*')
  .then((relevantStock)=>{
    return relevantStock;
  })
}
module.exports.increaseStockQuantity = function(id,{condition}){
  return knex('stock')
  .update('quantity', knex.raw('quantity + 1'))
  .where('condition', condition)
  .where('issue_id', id)
  .returning('*')
  .then((relevantStock)=>{
    return relevantStock;
  })
}
module.exports.updateStockPrice=function(id,{price,condition}){
  return knex('stock')
  .update({price:price})
  .where('issue_id',id)
  .where('condition', condition)
  .returning('*')
  .then((updatedStock)=>{
    return updatedStock;
  });
}
module.exports.getIssueById = function(id){
  return knex('issues')
  .select(['issues.id as id','title','series_id','volume','number', 'pub_date', 'ebay', 'shopify', 'cover_image'])
  .join('series','issues.series_id','series.id')
  .where('issues.id',id)
  .first()
  .then(issue=>issue);
}
module.exports.checkIfShopifyTracking = function(issueId){
  return knex('issues')
  .where('id', issueId)
  .returning('*')
  .first()
  .then(relevantIssue=>relevantIssue.shopify);
}
module.exports.addShopifyIdToIssue = function(shopifyId, issueId){
  return knex('issues')
  .where('id',issueId)
  .update({shopify_id: shopifyId})
  .returning('*')
  .then((updatedIssue)=>{
    updatedIssue[0].shopify_id = Number(updatedIssue[0].shopify_id);
    return updatedIssue[0];
  });
}
module.exports.addShopifyIdToStock = function(shopifyId, issueId, condition){
  return knex('stock')
  .where('issue_id', issueId)
  .where('condition', condition)
  .update({shopify_id: shopifyId})
  .returning('*')
  .then((updatedStock)=>{return updatedStock[0];});
}
