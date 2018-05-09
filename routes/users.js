const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const checkAuth = require("../authenticate");
const userController = require("../controllers/userController");
var bodyParser = require('body-parser');


//Get all Manager
router.get("/getAll",checkAuth.checkManager,userController.get_all);

//User Sign Up
router.post("/signup",userController.sign_up);

//Get all Stores
router.get("/getStoreList",userController.getStoreList);

//User Log In
router.post("/login",userController.login);


//Twilo stuff
router.post('/sendsms/:num/:time', bodyParser.json(), (req, res,next) => {
  var client = require('twilio')('ACc688dea366759db0a4508fdb961cd7ad', '374464ffcd050e7fad0991f055481327');
  //var bod = 'Your order is ' + time + ' minutes away';
  client.messages
  .create({
     body: 'Your order is ' + req.params.time + ' minutes away',
     from: '+18459996707',
     to: req.params.num
   })
  .then(message => console.log(message.sid))
  .done();
  
})

module.exports = router;
