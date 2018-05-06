const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../env");
const customerSchema = require("../models/customerSchema");
const storeSchema = require("../models/storeSchema");


// Make order for visitor.  It will just store an order on Store and Manager will see it.

/*
	Add Orders to the store+Customer current orders. ( POST Request)
	Input:
		{
			"store_name":"ABC 50th Street Pizza",
			"items":[
				{
						"name":"Apple Pizza",
						"quantity":18
				},
				{
					"name":"Pineapple Pizza",
					"quantity": 20
				}
			]


		}

	Output:
			{
		    "message": "Created Order!",
		    "unique_conifmration": 1522797520040
		}


*/
exports.make_order = async (req,res,next)=>
{
	const confirmed= Date.now();

	let findCustomer = await customerSchema.findOne({"email":req.userData.email}).exec();

	storeSchema['store'].findOne({"name":req.body.store_name}).exec()
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
				items: req.body.items,
				confirmation:confirmed

			});
			console.log(findCustomer);
			result.current_orders.push(order);
			console.log(req.userData)
			if(findCustomer===null)
				throw " Finding Customer Error. Make sure all the information are inputted properly!"
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
/*

	storeSchema['store'].findOneAndUpdate({"name":req.params.name},{"rating":req.params.rating},{"new":true})
	.then((result)=>
	{
		if(result.length<1){
			return res.status(409).json({
					message:"No Store Registered by Manager Yet!"
				});
		}else
		{
			return res.status(202).json(result);
		}
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Change Rating; Database Error ",
			error: err
		})
	});

*/


/*

	Sample Input: http://localhost:3001/customer/changeRating/robinCustomer@test.com/5
	Output: Updated Document

*/
exports.rateCustomer= (req,res,next)=>

{
	customerSchema.findOneAndUpdate({"email":req.params.name},{"rating":req.params.rating},{"new":true})
	.then(result=>
	{		
		if(result.length<1){
			return res.status(409).json({
					message:"No Customer Found By that email!"
				});
		}else
		{
			return res.status(202).json(result);
		}
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Change Rating Customer; Database Error ",
			error: err
		})
	});

}
