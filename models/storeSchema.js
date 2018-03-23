//We will prepopulate these collection with sample stores later.
//Still missing a stuffs. we will fix it after we make these schema functional.

const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:{ type:String,required: true,unique:true},
	manager_email:{type:String,required:true,unique:true},
	location:{type:String,required:true},
	rating: {type:Number,required:false,default:0}

	}
);
module.exports = mongoose.model('Store',storeSchema);