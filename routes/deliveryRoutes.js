const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const checkAuth = require("../authenticate");
const deliveryController = require("../controllers/deliveryController");



router.get('/getAll',deliveryController.getAll);
router.get('/myOrders',checkAuth.checkDelivery, deliveryController.getMyOrders);
router.get('/completeOrder/:id',checkAuth.checkDelivery,deliveryController.completeOrder);


module.exports = router;