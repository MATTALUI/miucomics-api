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


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(formidable({
  uploadDir: path.join(__dirname, '/temp'),
}));
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  res.set({'X-who-stole-the-cookies-from-the-cookie-jar': 'matt'});
  next();
});






app.get('/', function(req,res,next){
  s3.getObject({
    Bucket: 'mixitupcomicimages',
    Key: 'spidermancover.jpg'
  },function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
      // res.send(data.Body);
    }
  });
  res.send('Hello World.')
});

app.post('/', function(req,res,next){
  for (let file in req.files){
    fs.readFile(req.files[file].path,function(err, fileBuffer){
      if(err) console.eror(err);
      s3.putObject({
        Bucket: 'mixitupcomicimages',
        Key: `${file}`,
        Body: fileBuffer,
        ACL: 'public-read'
      },function(err,data){
        if(err){
          console.error(err);
        }else{
          fs.unlink(req.files[file].path,()=>{});
        }
      });
    });
  }
  res.send('at\'ll do, pig.');




});


app.listen(port,function(){
  console.log('listening on :'+port);
});
