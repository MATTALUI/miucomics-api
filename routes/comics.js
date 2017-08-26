const express = require('express');
const router = express.Router();
const knex = require('../knex');
const queries = require('../queries/queries.js')


router.get('/series', function(req,res,next){
  queries.getAllSeriesWithImages().then(function(info){
    res.send(info);
  });
});

router.get('/series/:id', function(req,res,next){
  queries.getSeriesIssuesWithStockInfo(req.params.id).then(function(info){
    res.send(info);
  });
});

router.post('/series', function(req,res,next){
  queries.postNewSeries(req.body).then((newSeries)=>{
    res.send(newSeries);
  });
});

router.delete('/series/:id', function(req,res,next){
  queries.deleteSeries(req.params.id).then(()=>{
    res.sendStatus(202);
  });
});
















router.get('/issues', function(req,res,next){
  queries.getAllIssues().then(function(info){
    res.send(info);
  });
});
router.get('/stock', function(req,res,next){
  queries.getAllStock().then(function(info){
    res.send(info);
  });
});
router.get('/meow',function(req,res,next){
  queries.meow().then((info)=>{res.send(info)});
});

module.exports = router;
