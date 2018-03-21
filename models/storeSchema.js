//We will prepopulate these collection with sample stores later.
//Still missing a stuffs. we will fix it after we make these schema functional.

const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:{ type:String,required: true,uinque:true},
	manager_email:{type:String,required:true,uinque:true},
	location:{type:String,required:true},
	rating: {type:Number,required:true}

	}
);
module.exports = mongoose.model('Store',storeSchema);