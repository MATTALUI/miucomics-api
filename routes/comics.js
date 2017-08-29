const express = require('express');
const router = express.Router();
const knex = require('../knex');
const queries = require('../queries/queries.js');
const multer  = require('multer');
const upload = multer({ dest: 'temp/' });
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-2'
});



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

router.post('/issues',upload.single('cover_image'), function(req,res,next){
  req.body.series_id = Number(req.body.series_id);
  req.body.number = Number(req.body.number);
  req.body.ebay = (req.body.ebay==='true');
  req.body.shopify = (req.body.shopify==='true');
  req.pub_date = req.pub_date;
  if(req.body.ebay){
    //space for handling ebay, when we get to that
    console.log('shared with ebay');
  }
  if(req.body.shopify){
    //space for handling ebay, when we get to that
    console.log('shared with shopify');
  }
  if(req.file != undefined){
    let imageKey = normalizeImageUrl(req.body.series_title, req.body.number,req.file.mimetype);
    let coverUrl = 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/' + imageKey;
    fs.readFile(req.file.path, function(err,coverBuffer){
      s3.putObject({
            Bucket: 'mixitupcomicimages',
            Key: imageKey,
            Body: coverBuffer,
            ACL: 'public-read'
      },function(err,data){
        if (err){
          console.log(err);
          fs.unlink(req.file.path,()=>{});
          res.send(err);
        }else{
          fs.unlink(req.file.path,()=>{});
          delete req.body.series_title;
          req.body.cover_image = coverUrl;
          queries.postNewIssue(req.body).then((newIssueInfo)=>{
            res.send(newIssueInfo);
          });
        }
      });
    });

  }else{
    delete req.body.series_title;
    req.body.cover_image = 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg';
    queries.postNewIssue(req.body).then(function(newIssue){
      res.send(newIssue)
    });
  }

});

router.post('/stock', function(req,res,next){
  req.body.stockInfo.forEach((stockObject)=>{
    stockObject.condition = stockObject.quality;
    delete stockObject.quality;
    stockObject.issue_id = req.body.issueId;
  });
  queries.postNewStockInfo(req.body.stockInfo).then(()=>{
    res.sendStatus(202);
  });
});









function normalizeImageUrl(series, issueNumber,extension='image/jpeg'){
	return series.split('').filter((character)=>{
		return character.match(/[^!*'(.){}";:@&=/[\]+$,/?%#]/gi);
	}).join('').replace(/[' ']/gi,'-').replace('Volume-','')+'-'+issueNumber+'.'+extension.split('/')[1];

}














// router.get('/issues', function(req,res,next){
//   queries.getAllIssues().then(function(info){
//     res.send(info);
//   });
// });
// router.get('/stock', function(req,res,next){
//   queries.getAllStock().then(function(info){
//     res.send(info);
//   });
// });
// router.get('/meow',function(req,res,next){
//   queries.meow().then((info)=>{res.send(info)});
// });

module.exports = router;
