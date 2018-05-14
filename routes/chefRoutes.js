const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const key = require("../env");
const checkAuth = require("../authenticate");
const chefController = require("../controllers/chefController")


//Add Recipe Route
router.post("/addRecipe",checkAuth.checkChef,chefController.add_recipe);

router.post("/getMenu",checkAuth.checkChef,chefController.my_menu);

router.post("/changePrice",chefController.change_price);

router.post("/changeRating",chefController.changeRating);

module.exports = router;
