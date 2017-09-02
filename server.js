'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const queries = require('./helpers/queries.js');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const AWS = require('aws-sdk');
const path = require('path');
const formidable = require('express-formidable');
const request = require('request');
const fs = require('fs');
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: 'us-east-2'
});
var squareAppId;
var squareAccessToken;
if(process.env.NODE_ENV === 'production'){
  squareAppId = process.env.SQUARE_APP_ID;
  squareAccessToken = process.env.SQUARE_PERSONAL_ACCESS_TOKEN;
}else{
  squareAppId = process.env.SANDBOX_SQUARE_APP_ID;
  squareAccessToken = process.env.SANDBOX_SQUARE_PERSONAL_ACCESS_TOKEN;
}



const comicsRoute = require('./routes/comics.js');



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  res.set({'X-who-stole-the-cookies-from-the-cookie-jar': 'matt'});
  next();
});



app.use('/comics', comicsRoute);


app.get('/', function(req,res,next){
  if(process.env.NODE_ENV === 'production'){
    res.redirect('http://miucomics.herokuapp.com/');
  }else{
    res.redirect('http://localhost:3000');
  }
});
app.get('/test',function(req,res,next){
  let options = {
    url: `https://connect.squareup.com/v1/${process.env.LOCATION_ID}/items`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.SQUARE_PERSONAL_ACCESS_TOKEN}`
    }
  }
  request(options,function(error, response, body){
    body = JSON.parse(body);
    let filtered = body.filter(stock=>stock.quantity_on_hand>0);
    res.send(body);
    // res.send(filtered);
  });
});


app.listen(port,function(){
  console.log('listening on :'+port);
});
