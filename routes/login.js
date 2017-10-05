const express = require('express');
const router = express.Router();
const queries = require('../helpers/queries.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/', function(req,res,next){
  if(req.cookies.user){
    jwt.verify(req.cookies.user, process.env.JWTSECRET, (error,decoded)=>{
      if(error){
        res.send(false);
      }else{
        res.send(true)
      }
    });
  }else{
    res.send(false);
  }
});


router.post('/',function(req,res,next){
  queries.getPassword(req.body.userName).then((hashword)=>{
    if(hashword){
      bcrypt.compare(req.body.password, hashword,(error, match)=>{
        if (match) {
          let userInfo = {
            name: req.body.userName
          };
          jwt.sign(userInfo, process.env.JWTSECRET,(err, token)=>{
            res.cookie('user', token);
            res.send(true);
          });
        }else{
          res.clearCookie('user');
          res.send(false);
        }
      });
    }else{
      res.send(false);
    }
  });
});



router.delete('/',function(req,res,next){
  res.clearCookie('user');
  res.send('logout');
});

module.exports = router;
