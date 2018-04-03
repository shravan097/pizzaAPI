const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const checkAuth = require("../authenticate");
const storeController = require("../controllers/storeController");


//Get all the un-registered stores
router.get("/getAllRaw",storeController.get_all_unregistered);

router.get("/getAllStore",storeController.get_all);

router.get("/getChef/:email",storeController.find_Chef_by_email);

router.get("/:name/getAllMenu",storeController.getAllMenu);
router.post("/makeVisitorOrder",storeController.add_order);


module.exports = router;


