'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-2'
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req,res,next){
  s3.getObject({
    Bucket: 'mixitupcomicimages',
    Key: 'spidermancover.jpg'
  },function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
      res.send('check the console');
    }
  });

  // next();
})
app.get('/', function(req,res,next){
  // res.redirect('http://www.google.com');
  res.send('Hello World.')
});


app.listen(port,function(){
  console.log('listening on :'+port);
});
