'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const AWS = require('aws-sdk');
const path = require('path');
const formidable = require('express-formidable');
const fs = require('fs');
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-2'
});



const comicsRoute = require('./routes/comics.js');



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  res.set({'X-who-stole-the-cookies-from-the-cookie-jar': 'matt'});
  next();
});



app.use('/comics', comicsRoute);


app.get('/', function(req,res,next){
  s3.getObject({
    Bucket: 'mixitupcomicimages',
    Key: 'spidermancover.jpg'
  },function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
      res.send(data);
    }
  });
  // res.send('Hello World.')
});


app.listen(port,function(){
  console.log('listening on :'+port);
});
