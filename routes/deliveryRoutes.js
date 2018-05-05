const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const checkAuth = require("../authenticate");
const deliveryController = require("../controllers/deliveryController");



router.get('/getAll',deliveryController.getAll);


module.exports = router;