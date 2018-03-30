//We will prepopulate these collection with sample stores later.
//Still missing a stuffs. we will fix it after we make these schema functional.

const mongoose = require('mongoose');


const storeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:{ type:String,required: true,unique:true},
	manager_email:{type:String,required:false,unique:true},
	//Location Set to False for initial testing
	location:{type:String,required:false},
	rating: {type:Number,required:false,default:0},
	chefs: {email:{type:Array,required:false,unique:true,default:[]}}
	}
);
module.exports = mongoose.model('Store',storeSchema);