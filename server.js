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
  uploadDir: path.join(__dirname, '/uploads'),
}));
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
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
  // console.log(req.fields);
  for (let file in req.files){
  console.log(req.files[file].path);
    fs.readFile(req.files[file].path,function(err, fileBuffer){
      s3.putObject({
        Bucket: 'mixitupcomicimages',
        Key: `${file}.jpg`,
        Body: fileBuffer
      },function(err,data){
        if(err){
          console.error(err)
        }else{
          // fs.unlink(req.files[file].path);
          console.log(data);
        }
      });
    });
  }
  res.send('meow');




});


app.listen(port,function(){
  console.log('listening on :'+port);
});
