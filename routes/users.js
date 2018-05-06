const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const checkAuth = require("../authenticate");
const userController = require("../controllers/userController");


//Get all Manager
router.get("/getAll",checkAuth.checkManager,userController.get_all);

//User Sign Up
router.post("/signup",userController.sign_up);

//Get all Stores
router.get("/getStoreList",userController.getStoreList);

//User Log In
router.post("/login",userController.login);


module.exports = router;
