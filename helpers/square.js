const request = require('request');
const queries = require('./queries.js');



function addStock({quantity, id , condition, issue_id, price}){
  if(quantity>0){
    let req = {
      quantity_delta: quantity,
      adjustment_type: 'MANUAL_ADJUST'
    }
    let options = {
      url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/inventory/stock-${id}`,
      method: `POST`,
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
      }
    };
    request(options,(error,response,body)=>{
      console.log(body);
    });
  }
}
module.exports.createSquareItemFromStocks = function(stocks){
  queries.getIssueById(stocks[0].issue_id).then((issue)=>{
    let itemObj = {
      name : `${issue.title} Volume ${issue.volume} Issue ${issue.number}`,
      id: `issues-${issue.id}`,
      color: "FFD241",
      category_id: `series-${issue.series_id}`,
      visibility: "PRIVATE",
      variations: []
    };
    stocks.forEach((stockObject)=>{
      let variation = {
        name: `${stockObject.condition}`,
        id: `stock-${stockObject.id}`,
        pricing_type: "FIXED_PRICING",
        track_inventory: true,
        inventory_alert_type: 'LOW_QUANTITY',
        price_money: {
          currency_code: `USD`,
          amount: ((stockObject.price.toFixed(2))*100)
        }
      };
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
    };
    request(options,(error,response,body)=>{
      if(error)console.log(error);
      stocks.forEach(addStock);
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
module.exports.decrementStock = function({id}){
  let req = {
    quantity_delta: -1,
    adjustment_type: 'MANUAL_ADJUST'
  }
  let options = {
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/inventory/stock-${id}`,
    method: `POST`,
    body: JSON.stringify(req),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  };
  request(options,(error,response,body)=>{
    // console.log(body);
  });
}
module.exports.incrementStock = function({id}){
  let req = {
    quantity_delta: 1,
    adjustment_type: 'MANUAL_ADJUST'
  }
  let options = {
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/inventory/stock-${id}`,
    method: `POST`,
    body: JSON.stringify(req),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  };
  request(options,(error,response,body)=>{
    // console.log(body);
  });
}
module.exports.updatePrice = function(stockObject){
  let req = {
    price_money: {
      currency_code: "USD",
      amount: ((stockObject.price.toFixed(2))*100)
    }
  };
  let options = {
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/items/issues-${stockObject.issue_id}/variations/stock-${stockObject.id}`,
    method: `PUT`,
    body: JSON.stringify(req),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  };
  request(options,(error,request,body)=>{
    // console.log(body);
  });
}
