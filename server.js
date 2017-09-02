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

});


app.listen(port,function(){
  console.log('listening on :'+port);
});
