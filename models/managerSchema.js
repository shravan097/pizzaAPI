const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	store_name: String
	}
);
module.exports = mongoose.model('Manager',managerSchema);