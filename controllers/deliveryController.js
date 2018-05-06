const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const Manager = require("../models/managerSchema");
const jwt = require("jsonwebtoken");
const key = require("../env");
const Store = require('../models/storeSchema');
const deliverySchema = require("../models/deliverySchema");


exports.getAll = (req,res,next)=>
{
	deliverySchema.find().exec()
	.then((result)=>
	{
		if(result.length<1){
			return res.status(409).json({
					message:"No Delivery Person Signed Up Yet!"
				});
		}else
		{
			return res.status(202).json(result);
		}
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}

/*
Type of Request:  GET
Sampe Input: http://localhost:3001/delivery/myOrders
Output: Current Orders
*/

exports.getMyOrders = (req,res,next)=>
{
	deliverySchema.findOne({"email":req.userData.email})
	.then(result=>
	{
		return res.status(200).json(result["current_orders"]);

	}).catch(err=>
	{
		return res.status(409).json({
			"message":"Error Occured while finding Delivery person orders!",
			"error":err}
			);
	})

}

/*
Type of Request: GET
Sample Input: http://localhost:3001/delivery/completeOrder/5aef7c7c61e817a2cf5b8c71
Output: Message or ERROR

*/

exports.completeOrder = (req,res,next)=>
{

	deliverySchema.findOne({"email":req.userData.email})
	.then(result=>
	{

		let pos = -1;
				console.log(result.current_orders.length);
		const targetId = mongoose.Types.ObjectId(req.params.id);

		for(let i = 0; i<result.current_orders.length; ++i)
		{
			if(result.current_orders[i]["_id"].equals(targetId))
			{	pos = i; break;}
		}

		if(pos!=-1)
			result.current_orders.splice(pos,1);
		else
			throw "Order Given Not Found!";

		result.save()
		.then(result=>
		{
			return res.status(200).json({
				"message":"Order was succesfully marked Completed!"
			})
		})
		.catch(err=>
		{
			return res.status(400).json({
				"message":"Saving Failed after completing order",
				"error": "Error"
			})
		})


	}).catch(err=>
	{
		return res.status(409).json({
			"message":"Error Occured while complete Order function in DeliveryController!",
			"error":err}
			);
	})







}
