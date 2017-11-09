'use strict';
var allowedOrigin;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  allowedOrigin = 'http://mixitup.com.ics:3000';
}else{
  allowedOrigin = 'http://miucomics.herokuapp.com'
}
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const request = require('request');
const comicsRoute = require('./routes/comics.js');
const webhooksRoute = require('./routes/webhook.js');
const loginRoute = require('./routes/login.js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');




app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(process.env.NODE_ENV !== 'production' && process.argv[2] === 'slow'){
  app.use('/', function(req,res,next){
    //this middleware simulates slow connection in a production environment
    for(let i = 0; i<=15000;i++){
      console.log(i);
    }
    next();
  });
}

app.use('/webhook', webhooksRoute);

app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  res.set('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,PATCH');
  res.set('Access-Control-Allow-Origin', allowedOrigin);
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', true);
  res.set({'X-who-stole-the-cookies-from-the-cookie-jar': 'matt'});
  next();
});

app.use('/login', loginRoute);
app.use('/comics', comicsRoute);

app.get('/', function(req,res,next){
  if(process.env.NODE_ENV === 'production'){
    res.redirect('http://miucomics.herokuapp.com/');
  }else{
    res.redirect('http://localhost:3000');
  }
});
app.get('/test',function(req,res,next){
  res.send('tudo bom');
});


app.listen(port,function(){
  console.log(process.argv[2]==='slow'?'listening slowly on :'+port:'listening on :'+port);
});
