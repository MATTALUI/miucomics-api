const express = require('express');
const router = express.Router();
const knex = require('../knex');
const queries = require('../helpers/queries.js');
const squareCall = require('../helpers/square.js');
const shopifyCall = require('../helpers/shopify.js');
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
router.patch('/series/:seriesId',function(req,res,next){
  console.log('update series');
  res.sendStatus(204);
});
router.patch('/issues/:issueId',upload.single('cover_image'),function(req,res,next){
    if(req.file != undefined){
      let seriesTitle = req.body.seriesTitle;
      let imageKey = normalizeImageUrl(seriesTitle, req.body.number,req.file.mimetype);
      delete req.body.seriesTitle;
      fs.readFile(req.file.path,function(error,coverBuffer){
        fs.unlink(req.file.path,()=>{});
          let coverUrl;
          let bucket;
          if(process.env.NODE_ENV === 'production'){
            coverUrl = 'https://s3.amazonaws.com/mixitupcomics/' + imageKey;
            bucket = 'mixitupcomics';
          }else{
            coverUrl = 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/' + imageKey;
            bucket = 'mixitupcomicimages';
          }
          req.body.cover_image = coverUrl;
          s3.putObject({
            Bucket: bucket,
            Key: imageKey,
            Body: coverBuffer,
            ACL: 'public-read',
            ContentType: req.file.mimetype
          },function(error, data){
            queries.updateIssue(req.params.issueId,req.body).then((updated)=>{
              res.send(updated);
            })
          })

      });
    }else{
      queries.updateIssue(req.params.issueId,req.body).then((updated)=>{
        res.send(updated);
      });
    }
});
router.post('/series', function(req,res,next){
  queries.postNewSeries(req.body).then((newSeries)=>{

    if(process.env.NODE_ENV !== 'production'){
      squareCall.createSquareCategoryFromSeries(newSeries);
    }

    //create categories on shopify here
    //create categories on ebay here
    res.send(newSeries);
  });
});

router.delete('/series/:seriesId', function(req,res,next){
  queries.getSeriesIssuesWithStockInfo(req.params.seriesId).then((issues)=>{
    issues.forEach((issue)=>{
      queries.deleteIssue(issue.id).then((deletedIssue)=>{
        squareCall.deleteIssue(deletedIssue.id);
        if(deletedIssue.shopify === true){
          shopifyCall.deleteIssue(deletedIssue.shopify_id);
        }
      });
    });
    queries.deleteSeries(req.params.seriesId).then((deletedSeries)=>{
      if(process.env.NODE_ENV !== 'production'){
        squareCall.deleteSquareCategory(deletedSeries.id);
      }
    });
    res.sendStatus(202);
  });
});

router.delete('/issues/:id', function(req,res,next){
  queries.deleteIssue(req.params.id).then((deleted)=>{
    console.log(deleted);
    if(deleted.cover_image.indexOf('amazonaws.com') >-1 && deleted.cover_image !== 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg'){
      //XXX: you should probably delete the images from s3...
      // let bucket;
      // if(process.env.NODE_ENV === 'production'){
      //   bucket = 'mixitupcomics';
      // }else{
      //   bucket = 'mixitupcomicimages';
      // }
      // let options = {
      //   Bucket: bucket,
      //   key:
      // }
      // s3.deleteObject(options, function(error,data){
      //   if(error){
      //     console.error(error);
      //   }else{
      //     console.log(data);
      //   }
      // });
    }
    squareCall.deleteIssue(deleted.id);
    if(deleted.shopify === true){
      shopifyCall.deleteIssue(deleted.shopify_id);
    }
    res.sendStatus(204);
  });
});




router.post('/issues',upload.single('cover_image'), function(req,res,next){
  req.body.series_id = Number(req.body.series_id);
  req.body.number = Number(req.body.number);
  req.body.ebay = (req.body.ebay=='true');
  req.body.shopify = (req.body.shopify=='true');
  req.pub_date = req.pub_date;
  if(req.file != undefined){
    let imageKey = normalizeImageUrl(req.body.series_title, req.body.number,req.file.mimetype);
    let coverUrl;
    if(process.env.NODE_ENV === 'production'){
      coverUrl = 'https://s3.amazonaws.com/mixitupcomics/' + imageKey;
    }else{
      coverUrl = 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/' + imageKey;
    }

    fs.readFile(req.file.path, function(err,coverBuffer){
      let bucket;
      if(process.env.NODE_ENV === 'production'){
        bucket = 'mixitupcomics';
      }else{
        bucket = 'mixitupcomicimages';
      }
      s3.putObject({
            Bucket: bucket,
            Key: imageKey,
            Body: coverBuffer,
            ACL: 'public-read',
            ContentType: req.file.mimetype
      },function(err,data){
        fs.unlink(req.file.path,()=>{});
        if (err){
          console.error('error: ',err);
          res.send(err);
        }else{
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



router.get('/stock/:id', function(req,res,next){
  queries.getStockForIssue(req.params.id).then((stockInfo)=>{
    res.send(stockInfo);
  });
});

router.post('/stock', function(req,res,next){
  queries.postNewStockInfo(req.body).then((newStockInfo)=>{
    squareCall.createSquareItemFromStocks(newStockInfo);
    shopifyCall.checkShopifyTrackingfromStockInfo(newStockInfo);
    //create ebay issues from stock information here
    res.send(newStockInfo)
  });
});

router.patch('/stock/:id',function(req,res,next){
  queries.updateStockPrice(req.params.id,req.body).then((stock)=>{
    squareCall.updatePrice(stock[0]);
    shopifyCall.checkShopifyTrackingFromStockChange(stock[0]);
    //update ebay prices here
    res.sendStatus(202);
  });
});

router.put('/stock/:id', function(req,res,next){
  queries.increaseStockQuantity(req.params.id,req.body).then((stock)=>{
    squareCall.incrementStock(stock[0]);
    shopifyCall.checkShopifyTrackingFromStockChange(stock[0]);
    //update ebay quantities here
    res.sendStatus(202);
  });
});

router.delete('/stock/:id', function(req,res,next){
  queries.decreaseStockQuantity(req.params.id,req.body).then((stock)=>{
    squareCall.decrementStock(stock[0]);
    shopifyCall.checkShopifyTrackingFromStockChange(stock[0]);
    //update ebay quantities here
    res.sendStatus(202);
  });
});









function normalizeImageUrl(series, issueNumber,extension='image/jpeg'){
	return series.split('').filter((character)=>{
		return character.match(/[^!*'(.){}";:@&=/[\]+$,/?%#]/gi);
	}).join('').replace(/[' ']/gi,'-').replace('Volume-','')+'-'+issueNumber+'.'+extension.split('/')[1];

}




module.exports = router;
