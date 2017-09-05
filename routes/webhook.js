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
router.use('/square', function(req,res,next){
  console.log('square');
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
