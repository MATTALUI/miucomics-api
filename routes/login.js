const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

router.get('/', function(req,res,next){
  console.log(req.cookies.user);
  res.send(false);
});
router.post('/',function(req,res,next){
  // console.log(req.body);
  // req.cookie('world', 'hello');
  // res.set('Access-Control-Allow-Origin', true);
  // console.log(res.headers);
  res.cookie('user', req.body.userName, {httpOnly: true});
  res.send(false);
});
router.delete('/',function(req,res,next){
  res.send('logout');
});

module.exports = router;
