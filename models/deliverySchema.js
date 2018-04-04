
const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:{ type:String,required: true,uinque:true},
	delivery_email:{
		type:String,
		required:true,
		uinque:true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},
	location:{type:String,required:true},
	rating: {type:Number,required:true}
	

	}
);
module.exports = mongoose.model('Delivery',deliverySchema);