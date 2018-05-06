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
		confirmation:{type:Number,required:false},
		destination: {type:String, required:true},
		customer_email:{type:String,required:false}
		//method of payment
	});

const storeSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		name:{ type:String,required: true,unique:true},
		manager_email:{type:String,required:false,unique:true},
		//Location Set to False for initial testing
		location:{type:String,required:true},
		rating: {type:Number,required:false,default:0},
		//Will provide checks on controller so chefs and customers are never duplicated.
		chefs: {email:{type:Array,required:false}},
		//Store has Bunch of Customers that must be approved by Manager
		registered_customers:{email:{type:Array,required:false,index:false,sparse:true}},
		pending_customers:{	email:{type:Array,required:false,index:false,sparse:true}},
		blacklisted_customers:{email:{type:Array,required:false,index:false,sparse:true}},
		vip_customer:{email:{type:String,required:false,index:false,sparse:true}},
		current_orders:[order]
	}
);
const store = mongoose.model('Store',storeSchema);
const Order = mongoose.model('Order',order);

module.exports = {"store":store, "order":Order};