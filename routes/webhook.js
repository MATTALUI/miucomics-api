const express = require('express');
const router = express.Router();
const queries = require('../helpers/queries.js');
const squareCall = require('../helpers/square.js');
const shopifyCall = require('../helpers/shopify.js');
const fs = require('fs');

router.use('/', function(req,res,next){
  console.log(req.body);
  next();
});
router.use('/shopify', function(req,res,next){
  let promises = [];
  let theStuffThatWeCareAbout = req.body.line_items.map((item)=>{
    let info = {};
    info.id = item.id;
    info.variantId = item.variant_id;
    info.quantity = item.quantity;
    info.productId = item.product_id;
    info.name = item.name;
    return info;
  });
  theStuffThatWeCareAbout.forEach((itemFromSale)=>{
    promises.push(queries.decreaseStockQuantityFromShopifyId(itemFromSale.variantId, itemFromSale.quantity));
  });

  Promise.all(promises).then((updatedStocks)=>{
    updatedStocks.forEach((stock,i)=>{
      squareCall.decrementStock({id:stock.id},Number(theStuffThatWeCareAbout[i].quantity));
      //update ebay quantities here
    });
  })
  res.sendStatus(202);
});




/*
https://docs.connect.squareup.com/api/connect/v1/#validating-notifications

this is the endpoint for the square webhook. It doesn't do any kind of validation right now to make testing locally easier, but you can find info for it at the link above. Matt Hummer Sep-6-17
*/
router.use('/square', function(req,res,next){
  if(req.body.event_type==='INVENTORY_UPDATED'){
    squareCall.updateToReflectSquare();
    //update ebay quantities here
    res.sendStatus(202);
  }else{
    res.sendStatus(405);
  }

});





router.use('/ebay',function(req,res,next){
  console.log('ebay webhooks');
  console.log(req.body);
});

module.exports = router;
