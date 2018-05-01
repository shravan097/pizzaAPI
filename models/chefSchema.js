const mongoose = require('mongoose');

const Recipe =  mongoose.Schema(
{
	_id:mongoose.Schema.Types.ObjectId,
	name:{type:String,required:true},
	price:{type: Number, required:true},
	rating:{type:Number,required:false, default:0},
	description:{type:String,required:true}
});

const chefSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	name:{type:String,required:true},
	recipe:[Recipe],
	store_affiliated_with:{type:String, required:true},
	salaryPaid:{type:Number,required:false,default:0}

	}
);
const recipe = mongoose.model('Recipe',Recipe);
const chef = mongoose.model('Chef',chefSchema);
module.exports = {
	"recipe":recipe,
	"chef": chef
}