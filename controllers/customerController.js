const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = require("../env");
const customerSchema = require("../models/customerSchema");

