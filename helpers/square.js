const request = require('request');
const queries = require('./queries.js');
const shopifyCall = require('./shopify.js');


function addTax(itemId,taxId){
  request({
    method: 'PUT',
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/items/${itemId}/fees/${taxId}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  },(error,response,body)=>{
    if(error){
      console.error(error);
    }
  });

}
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
    });
  }
}
module.exports.createSquareItemFromStocks = function(stocks){
  queries.getIssueById(stocks[0].issue_id).then((issue)=>{
    let category_id;
    if(process.env.NODE_ENV === 'production'){
      category_id = '2AED3A4E-AA37-42F0-9509-BF6C008A8C7A';
    }else{
      category_id = `series-${issue.series_id}`;
    }
    let itemObj = {
      name : `${issue.title} #${issue.number} (Volume ${issue.volume}${issue.pub_date?', '+issue.pub_date.getFullYear():''})`,
      id: `issues-${issue.id}`,
      color: "FFD241",
      category_id: category_id,
      master_image: {
        url: issue.cover_image,
        id: `${issue.title} #${issue.number} (Volume ${issue.volume}${issue.pub_date?', '+issue.pub_date.getFullYear():''}) cover`
      },
      visibility: "PRIVATE",
      variations: []
    };
    stocks.forEach((stockObject)=>{
      let variation = {
        name: `${stockObject.condition}`,
        id: `stock-${stockObject.id}`,
        pricing_type: "FIXED_PRICING",
        track_inventory: true,
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
      if(error)console.error(error);
      let taxId;
      if(process.env.NODE_ENV === 'production'){
        taxId = '6CF697E6-4F7D-431A-8992-CF0AC1CB3A5D';
      }else{
        taxId = 'JWBJ72DA7TTPRVIOIG4M3XTW';
      }
      addTax(itemObj.id,taxId);
      stocks.forEach(addStock);
    });
  });
}

module.exports.createSquareCategoryFromSeries = function(newSeries){
  let categoryObject = {
    "id": `series-${newSeries.id}`,
    "name": `${newSeries.title} (Volume ${newSeries.volume})`
  };
  let options = {
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/categories`,
    method: `POST`,
    body: JSON.stringify(categoryObject),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  };
  request(options,(error, response, body)=>{
    if(error)console.error(error);
  });
}
module.exports.decrementStock = function({id},decrementValue=1){
  let req = {
    quantity_delta: -(Number(decrementValue)),
    adjustment_type: 'MANUAL_ADJUST'
  };
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
    if(error)console.error(error);
  });
}
module.exports.incrementStock = function({id},incrementValue=1){
  let req = {
    quantity_delta: Number(incrementValue),
    adjustment_type: 'MANUAL_ADJUST'
  };
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
    if(error)console.error(error);
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
  request(options,(error,response,body)=>{
    if(error)console.error(error);
  });
}
module.exports.updateToReflectSquare = function(){
  let options = {
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/inventory`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  }
  request(options,(error,response,body)=>{
    body = JSON.parse(body);
    body.forEach((squareVariant)=>{
      let id = Number(squareVariant.variation_id.split('-')[1]);
      queries.getStockById(id).then((stock)=>{
        if(stock.quantity != squareVariant.quantity_on_hand){
          queries.changeStockQuantity(id, squareVariant.quantity_on_hand).then((updatedStock)=>{
            shopifyCall.checkShopifyTrackingFromStockChange(updatedStock[0]);
          });
        }
      });
    });
  });
}
module.exports.deleteIssue = function(issueId){
  let options = {
    method: 'DELETE',
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/items/issues-${issueId}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  };
  request(options,(error,response,body)=>{
    if(error){
      console.error(error);
    }
  });
}

module.exports.deleteSquareCategory = function(seriesId){
  let options = {
    method: 'DELETE',
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/categories/series-${seriesId}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  };
  request(options, (error,response,body)=>{
    if(error){
      console.error(error);
    }
  });
}

module.exports.editIssue = function(editedIssue){
  queries.getSeriesById(editedIssue.series_id).then((series)=>{
    let update = {
      name: `${series.title} #${editedIssue.number} (Volume ${series.volume}${editedIssue.pub_date?', ' + editedIssue.pub_date.getFullYear():''})`,
      master_image: {
        url: editedIssue.cover_image,
        id: `${series.title} #${editedIssue.number} (Volume ${series.volume}${editedIssue.pub_date?', ' + editedIssue.pub_date.getFullYear():''})`
      }

    };
    let options = {
      url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/items/issues-${editedIssue.id}`,
      method: 'PUT',
      body: JSON.stringify(update),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
      }
    };
    request(options,(error,response,body)=>{
      if(error){
        console.error(error);
      }
    });
  });
}
