
const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	name:{ type:String,required: true},
	//	We will add 
	// location:{type:String,required: true},
	store_affiliated_with:{name:{type:Array, required:false,index:false,sparse:true}},
	rating: {type:Number,required:false,default:0},
	totalRated:{type:Number,required:false,default:1},
	orders: {type:Array,required:false,index:false,sparse:false} 
	}
);
module.exports = mongoose.model('customer',customerSchema);