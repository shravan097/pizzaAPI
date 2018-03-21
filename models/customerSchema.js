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
	location:{type:String,required: true},
	black_listed:{type: Boolean,required:false,default:false},
	recipe: [Recipe],
	store_affiliated_with:{type:String, required:true}

	}
);
module.exports = mongoose.model('customerSchema',customerSchema);