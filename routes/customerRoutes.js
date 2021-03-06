const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const checkAuth = require("../authenticate");
const customerController = require("../controllers/customerController");

router.post('/makeOrder',checkAuth.checkCustomer,customerController.make_order);
router.post('/changeRating/:name/:rating',customerController.rateCustomer);
router.post('/sendComplaint',customerController.sendComplaint);
router.post('/rateDelivery/:email/:rating',customerController.rateDelivery);

router.get('/getOrder/:email',customerController.getOrder);
module.exports = router;
