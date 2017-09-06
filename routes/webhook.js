const express = require('express');
const router = express.Router();
const queries = require('../helpers/queries.js');
const squareCall = require('../helpers/square.js');
const shopifyCall = require('../helpers/shopify.js');


router.use('/shopify', function(req,res,next){
  console.log('shopify');
  console.log(req.body);
  res.sendStatus(200);
});




/*
https://docs.connect.squareup.com/api/connect/v1/#validating-notifications

this is the endpoint for the square webhook. It doesn't do any kind of validation right now to make testing locally easier, but you can find info for it at the link above. Sep-6-17
*/
router.use('/square', function(req,res,next){
  if(req.body.event_type==='INVENTORY_UPDATED'){
    squareCall.updateToReflectSquare();
    res.sendStatus(202);
  }else{
    res.sendStatus(405);
  }

});

module.exports = router;
