const request = require('request');
const queries = require('./queries.js');
const authorization = new Buffer(`${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_PASSWORD}`).toString('base64');

function addNewShopifyIdForNewIssue({product}){
  console.log(product);
}


module.exports.postNewIssueToShopifyFromStocks = function(stocks){
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
          price: (stock.price.toFixed(2))
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
      addNewShopifyIdForNewIssue(body)
    });
  });
}

module.exports.test = function(){
  return `Basic ${authorization}`;
}
