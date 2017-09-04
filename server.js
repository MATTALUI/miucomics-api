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
const request = require('request');

const shopifyCall = require('./helpers/shopify.js');


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
  let product = {
  "product": {
    "id": "1",
    "title": "The Walking Dead Volume 1 Issue 1",
    "images": [{"src":'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/The-Walking-Dead-1-1.jpeg'}],
    "variants": [
      {
        "option1": "Mint",
        "price": "10.00"
      },
      {
        "option1": "Very Good",
        "price": "20.00"
      }
    ]
  }
};
  let options = {
    url: `https://miucomicsdevelopment.myshopify.com/admin/products.json`,
    method: `POST`,
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic `
    }
  };
  request(options,(error,response,body)=>{
    res.send(body);
  });
});


app.listen(port,function(){
  console.log('listening on :'+port);
});
