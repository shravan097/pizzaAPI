const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const checkAuth = require("../authenticate");
const managerController = require("../controllers/managerController");



//Get all the Registered/Pending/Blacklisted Cusomters
//Checks if Manager has logged in
router.get("/getAllPendingCustomers",checkAuth.checkManager,managerController.get_all_pending_customers);

router.get("/getAllRegisteredCustomers",checkAuth.checkManager,managerController.get_all_registered_customers);

router.get("/getAllBlacklistedCustomers",checkAuth.checkManager,managerController.get_all_blacklisted_customers);


router.post("/approveCustomer",checkAuth.checkManager,managerController.approve_customer);

router.post("/blacklistCustomer",checkAuth.checkManager,managerController.blacklist_customer);

router.get("/getStoreName",checkAuth.checkManager,managerController.getStoreName);

router.post('/changePrice',checkAuth.checkManager,managerController.changePrice);

router.get('/makeDelivery/:deliveryPersonEmail',checkAuth.checkManager, managerController.makeDelivery);

router.post("/handleComplaint",checkAuth.checkManager,managerController.handleComplaint);

router.get("/getMyInfo",checkAuth.checkManager,managerController.getMyInfo);
router.get("/getMyStoreInfo",checkAuth.checkManager,managerController.getMyStoreInfo);


module.exports = router;
