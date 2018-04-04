const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const checkAuth = require("../authenticate");
const customerController = require("../controllers/customerController");

router.post('/makeOrder',checkAuth.checkCustomer,customerController.make_order);
module.exports = router;