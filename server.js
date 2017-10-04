'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  const allowedOrigin = 'http://localhost:8000';
}else{
  const allowedOrigin = 'http://miucomics.herokuapp.com'
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



// app.use(cors());
// app.use('/',function(req,res,next){
//   // Access-Control-Allow-Origin
//   // res.set
//   res.set('Access-Control-Allow-Origin','http://localhost:3000');
//   res.set('Access-Control-Allow-Headers', 'Content-Type');
//   res.set('Access-Control-Allow-Credentials', true);
//   next();
// });
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  res.set('Access-Control-Allow-Origin',allowedOrigin);
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', true);
  res.set({'X-who-stole-the-cookies-from-the-cookie-jar': 'matt'});
  next();
});

app.use('/login', loginRoute);
app.use('/webhook', webhooksRoute);
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
  console.log('listening on :'+port);
});
