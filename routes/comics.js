const express = require('express');
const router = express.Router();
const knex = require('../knex');
const queries = require('../queries/queries.js')


router.get('/series', function(req,res,next){
  queries.getAllSeries().then(function(info){
    res.send(info);
  });
});

module.exports = router;
