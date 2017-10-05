const express = require('express');
const router = express.Router();
const queries = require('../helpers/queries.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var host;
if (process.env.NODE_ENV !== 'production') {
  host = 'http://localhost:3000';
}else{
  host = 'http://miucomics.herokuapp.com'
}


router.get('/info', function(req,res,next){
  jwt.verify(req.cookies.user, process.env.JWTSECRET, (error, data)=>{
    queries.getUserInfo(data.name).then((user)=>{
      res.send(user);
    });
  });
});


router.get('/', function(req,res,next){
  if(req.cookies.user){
    jwt.verify(req.cookies.user, process.env.JWTSECRET, (error,decoded)=>{
      if(error){
        res.send(false);
      }else{
        res.send(true);
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
            res.cookie('user', token, {httpOnly: true});
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


router.patch('/', function(req,res,next){
  jwt.verify(req.cookies.user, process.env.JWTSECRET, (error, data)=>{
    if (error){
      res.set('Access-Control-Allow-Origin', host);
      res.clearCookie('user');
      res.sendStatus(401);
    }else{
      queries.getPassword(data.name).then((hashword)=>{
        bcrypt.compare(req.body.current, hashword, (error, match)=>{
          if(match){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.new, salt, function(err, hash) {
                  queries.changePassword(data.name, hash).then(()=>{
                    let message = {
                      text: 'Password Changed',
                      class: 'success'
                    }
                    res.send(message);
                  })
                });
            });
          }else{
            let message = {
              text: 'Password Incorrect',
              class: 'error'
            }
            res.send(message);
          }





        });
      });
    }
  });
});

router.delete('/',function(req,res,next){
  res.clearCookie('user');
  res.send('logout');
});

module.exports = router;
