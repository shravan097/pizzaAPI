const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = require("../env");
const customerSchema = require("../models/customerSchema");
const storeSchema = require("../models/storeSchema");


// Make order for visitor.  It will just store an order on Store and Manager will see it.
exports.make_order = async (req,res,next)=>
{
	const confirmed= Date.now();

	let findCustomer = await customerSchema.findOne({"email":req.body.email}).exec();


	storeSchema['store'].findOne({"store_name":req.body.store_name}).exec()
	.then((result)=>
	{
		if(result.length<1){
			return res.status(409).json({
					message:"No Store Registered by Manager Yet!"
				});
		}else
		{
			const order = new storeSchema['order']({
				_id: mongoose.Types.ObjectId(),
				name: req.body.name,
				quantity:req.body.quantity,
				confirmation:confirmed

			});
			result.current_orders.push(order);
			findCustomer.orders.push(order);
			Promise.all([result.save(),findCustomer.save()])
			.then((result1,result2)=>
			{
				res.status(201).json({
				message:"Created Order!",
				unique_conifmration: confirmed
			});
			}).catch((err)=>
			{
				console.log("Error!")
				res.status(500).json(err);
				console.log('Promise Error Caught!');

			});
		}
	}).catch((err2)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err2
		})
	});


	
}
