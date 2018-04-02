const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const checkAuth = require("../authenticate");
const storeController = require("../controllers/storeController");


//Get all the un-registered stores
router.get("/getAllRaw",storeController.get_all_unregistered);

router.get("/getAll",storeController.get_all);

router.get("/getChef/:email",storeController.find_Chef_by_email);


module.exports = router;


