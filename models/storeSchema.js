//We will prepopulate these collection with sample stores later.
//Still missing a stuffs. we will fix it after we make these schema functional.

const mongoose = require('mongoose');

const order = mongoose.Schema(
	{
		_id:mongoose.Schema.Types.ObjectId,
		//Order for Items in Carts
		items: [{
			name:{type:String,required:true},
			quantity:{type:Number,required:true}
		}],
		confirmation:{type:Number,required:false}
		//total cost
		//address
		//method of payment
	});

const storeSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		name:{ type:String,required: true,unique:true},
		manager_email:{type:String,required:false,unique:true},
		//Location Set to False for initial testing
		location:{type:String,required:false},
		rating: {type:Number,required:false,default:0},
		chefs: {email:{type:Array,required:false,unique:true,default:[]}},
		//Store has Bunch of Customers that must be approved by Manager
		registered_customers:{email:{type:Array,required:false,unique:true,default:[]}},
		pending_customers:{
			email:{type:Array,required:false,unique:true,default:[]}
		},
		blacklisted_customers:{email:{type:Array,required:false,unique:true,default:[]}},
		current_orders:[order]
	}
);
const store = mongoose.model('Store',storeSchema);
const Order = mongoose.model('Order',order);

module.exports = {"store":store, "order":Order};