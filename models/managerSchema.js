//Manager Collection Schema Idea
//Email can be used as a key for this DB for user authentication
//Store_affiliated_with tells us which store is this Manager from

const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	name: {type:String,required:true},
	store_affiliated_with: {type:String, required:true}

});
module.exports = mongoose.model('Manager',managerSchema);