const request = require('request');
const queries = require('./queries.js');




module.exports.createSquareItemFromStocks = function(stocks){
  queries.getIssueById(stocks[0].issue_id).then((issue)=>{
    let itemObj = {
      name : `${issue.title} Volume ${issue.volume} Issue ${issue.number}`,
      id: `issues-${issue.id}`,
      color: "FFD241",
      category_id: `series-${issue.series_id}`,
      visibility: "PRIVATE",
      variations: []
    }
    stocks.forEach((stockObject)=>{
      let variation = {
        name: `${stockObject.condition}`,
        id: `stock-${stockObject.id}`,
        pricing_type: "FIXED_PRICING",
        price_money: {
          currency_code: `USD`,
          amount: ((stockObject.price.toFixed(2))*100)
        }
      };
      console.log(variation.price_money);
      itemObj.variations.push(variation);
    });
    let options = {
      url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/items`,
      method: `POST`,
      body: JSON.stringify(itemObj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
      }
    }
    request(options,(error,response,body)=>{
      console.log(body);
    });
  });
}
module.exports.createSquareCategoryFromSeries = function(newSeries){
  let categoryObject = {
    "id": `series-${newSeries.id}`,
    "name": `${newSeries.title} Volume ${newSeries.volume}`
  }
  let options = {
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/categories`,
    method: `POST`,
    body: JSON.stringify(categoryObject),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  }
  request(options,(error, response, body)=>{});
}
