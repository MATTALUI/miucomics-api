const request = require('request');
const queries = require('./queries.js');
const authorization = new Buffer(`${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_PASSWORD}`).toString('base64');

function addNewShopifyIdForNewIssue({product},issueInfo){
  queries.addShopifyIdToIssue(product.id,issueInfo.id);
  product.variants.forEach((variant)=>{
    let issueId = issueInfo.id;
    let shopifyId = variant.id;
    let condition = variant.option1
    queries.addShopifyIdToStock(shopifyId, issueId, condition);
  });
}
function postNewIssueToShopifyFromStocks(stocks){
  queries.getIssueById(stocks[0].issue_id).then((issueInfo)=>{
    let product = {
      product: {
        title: `${issueInfo.title} Volume ${issueInfo.volume} Issue ${issueInfo.number}`,
        variants: [],
        images: [{src: issueInfo.cover_image}]
      }
    };
      stocks.forEach((stock)=>{
        let variant = {
          option1: stock.condition,
          price: (stock.price.toFixed(2)),
          inventory_management: 'shopify',
          inventory_quantity: stock.quantity
        };
        product.product.variants.push(variant);
    });
    let options = {
      url: `https://miucomicsdevelopment.myshopify.com/admin/products.json`,
      method: `POST`,
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${authorization}`
      }
    };
    request(options, (error,response,body)=>{
      if(error)console.error(error);
      addNewShopifyIdForNewIssue(JSON.parse(body), issueInfo);
    });
  });
}
function updateVariant(stock){
  let variant = {
    id: stock.shopify_id,
    option1: stock.condition,
    price: (stock.price.toFixed(2)),
    inventory_quantity: stock.quantity
  };
  let options = {
    url: `https://miucomicsdevelopment.myshopify.com/admin/variants/${stock.shopify_id}.json`,
    method: `PUT`,
    body: JSON.stringify({variant}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ${authorization}`
    }
  };
  request(options,(error, response, body)=>{
    if(error)console.error(error);
  });

}

module.exports.checkShopifyTrackingfromStockInfo = function(newStockInfo){
  queries.checkIfShopifyTracking(newStockInfo[0].issue_id).then((tracking)=>{
    if(tracking){
      postNewIssueToShopifyFromStocks(newStockInfo);
    }
  })
}
module.exports.checkShopifyTrackingFromStockChange = function(stockInfo){
  console.log('stock Info');
  console.log(stockInfo);
  queries.checkIfShopifyTracking(stockInfo.issue_id).then((tracking)=>{
    if(tracking){
      updateVariant(stockInfo)
    }
  })
}
