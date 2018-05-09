
const mongoose = require('mongoose');
const storeSchema = require("./storeSchema");
const deliverySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	//Clear the DB and Fix Unique Spelling later else DB key error will throw.
	name:{ type:String,required: true,unique:true},
	email:{
		type:String,
		required:true,
		unique:true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},
	rating: {type:Number,required:false,default:0},
	totalRating:{type:Number,required:false,default:1},
	salaryPaid: {type:Number,required:false,default:0},
	current_orders:[]
	

	}
);
module.exports = mongoose.model('Delivery',deliverySchema);