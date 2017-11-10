var shopUrl;
if(process.env.NODE_ENV === 'production'){
  shopUrl = 'https://mix-it-up-online.myshopify.com/admin/';
}else{
  shopUrl = 'https://miucomicsdevelopment.myshopify.com/admin/'
}
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
        title: `${issueInfo.title}  #${issueInfo.number} (Volume ${issueInfo.volume})`,
        variants: [],
        images: [{src: issueInfo.cover_image}],

      }
    };
    if(process.env.NODE_ENV === 'production'){
      product.product.collection_id = 436047120;
    }
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
      url: shopUrl+`products.json`,
      method: `POST`,
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${authorization}`
      }
    };
    request(options, (error,response,body)=>{
      if(error){
        console.error(error);
        return;
      }
      if(process.env.NODE_ENV==='production'){
        addToBackIssues(JSON.parse(body).product.id);
      }
      addNewShopifyIdForNewIssue(JSON.parse(body), issueInfo);
    });
  });
}
function addToBackIssues(product_id){
  let collect = {
    product_id,
    collection_id: 436047120
  };

  let options = {
    url: shopUrl+`collects.json`,
    method: `POST`,
    body: JSON.stringify({collect}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ${authorization}`
    }
  };
  request(options,(error, response, body)=>{
    if(error){
      console.error(error);
      return;
    }
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
    url: shopUrl+`variants/${stock.shopify_id}.json`,
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
  queries.checkIfShopifyTracking(stockInfo.issue_id).then((tracking)=>{
    if(tracking){
      updateVariant(stockInfo)
    }
  })
}

module.exports.test = function (){
  let options = {
    url: shopUrl+`custom_collections.json`,
    method: `GET`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ${authorization}`
    }
  };
  request(options, (error, response, body)=>{
    console.log(JSON.parse(body));
  });
}
