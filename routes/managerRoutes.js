const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const checkAuth = require("../authenticate");
const managerController = require("../controllers/managerController");



//Get all the Registered/Pending/Blacklisted Cusomters
//Checks if Manager has logged in
router.get("/getAllPendingCustomers",checkAuth.checkManager,managerController.get_all_pending_customers);

router.get("/getAllRegisteredCustomers",checkAuth.checkManager,managerController.get_all_registered_customers);

router.get("/getAllBlacklistedCustomers",checkAuth.checkManager,managerController.get_all_blacklisted_customers);


router.post("/approveCustomer",checkAuth.checkManager,managerController.approve_customer);

router.post("/blacklistCustomer",checkAuth.checkManager,managerController.blacklist_customer);


module.exports = router;


