const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../env");
const chefSchema = require('../models/chefSchema');
const storeSchema = require("../models/storeSchema");
const managerSchema = require("../models/managerSchema");
const deliverySchema = require("../models/deliverySchema");


// Get all the Registered/Pending Customers


/*
	Input:
		/manager/getAllPendingCustomers

	Output:
			[
	    {
	        "pending_customers": {
	            "email": [
	                "customer1@test.com"
	            ]
	        },
	        "_id": "5ac50b8705b94205bb2f72dd"
	    }
]



*/

exports.get_all_pending_customers = async (req,res,next) =>
{

	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();



	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with},"pending_customers").exec()
	.then((result)=>
	{
		 res.status(202).json(result);
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}



exports.get_all_registered_customers = async(req,res,next) =>
{
	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();


	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with},"registered_customers").exec()
	.then((result)=>
	{
		 res.status(202).json(result);
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}

exports.get_all_blacklisted_customers = async(req,res,next) =>
{
	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();


	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with},"blacklisted_customers").exec()
	.then((result)=>
	{
		 res.status(202).json(result);
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}


// I am doing a lot of DB calls in a single function.
// I  think a change to schema can lower the calls thus improving the efficiency.
// We may do this at the end.
//Approve Customer from Pending ( ie. move from pending to registered)

exports.approve_customer = async (req,res,next) =>
{
	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();

	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with},"pending_customers registered_customers").exec()
	.then((result)=>
	{
		emailIndex = result.pending_customers.email.indexOf(req.body.email);
		if(emailIndex>-1)
			result.pending_customers.email.splice(emailIndex,1);
		else
			throw "Customer Email Not on Pending List"
		result.registered_customers.email.push(req.body.email);

		result.save()
			.then((result2)=>
			{
				console.log(result2);
				res.status(201).json({
				message:"User succesfully moved to Registered Customers!",
			});
			}).catch((err2)=>
			{
				console.log("Error!")
				res.status(500).json(err2);
				console.log('Saving Approve Customer Err\nPromise Error Caught!');

			});
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}



// Put Customer on BlackList


exports.blacklist_customer = async (req,res,next) =>
{
	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();

	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with},"blacklisted_customers registered_customers").exec()
	.then((result)=>
	{
		emailIndex = result.registered_customers.email.indexOf(req.body.email);
		if(emailIndex>-1)
			result.registered_customers.email.splice(emailIndex,1);
		else
			throw "Customer Email Not on Registered List"

		console.log(result);
		result.blacklisted_customers.email.push(req.body.email);


		result.save()
			.then((result2)=>
			{
				console.log(result2);
				res.status(201).json({
				message:"User succesfully moved to BlackListed Customers!",
			});
			}).catch((err2)=>
			{
				console.log("Error!")
				res.status(500).json(err2);
				console.log('Saving BlackList Customer Err\nPromise Error Caught!');

			});
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Database Error",
			error: err
		})
	});
}


//Returns Store of the Manager Affiliated With
//Type : GET, requires authentication
// Input: /manager/getStoreName
//Output: StoreName

exports.getStoreName = async(req,res,next)=>
{

	const selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();

	return res.status(201).json(selected_manager.store_affiliated_with);


}


//I should have made this function earlier when doing chef so I am aware of my poor design.

//Changes price of menu item given object id
// Type: POST, requires authentication
/* Input: 	"id": "5ae507f8ba6abb24ce092fc8",
			"new_price":20

	Output:  "Price Updated " OR ERR MSG

*/

exports.changePrice = async (req,res,next)=>
{
	let chefs = null;
	let chefRecipe = null;
	let pos = -1;
	try{
		 chefs = await storeSchema['store'].findOne({"manager_email":req.userData.email},"chefs");
	}catch(err)
	{

	   res.status(500).json({"ChangePrice ChefRecipe Error":err});
	   return;
	}
	
	console.log(chefs.chefs.email);
	for(let i = 0; i< chefs.chefs.email.length ; ++i)
	{
		try{
			 chefRecipe = await chefSchema['chef'].findOne({'email':chefs.chefs.email[i]});
		}catch(err)
		{
			res.status(500).json({"ChangePrice ChefRecipe Error":err});
			return;
		}
		console.log("Chef Recipe ",chefRecipe);

		for(let j = 0; j<chefRecipe.recipe.length; ++j)
		{
			const targetObjId = mongoose.Types.ObjectId(req.body.id);

			console.log("PIZZA ID: ",chefRecipe.recipe[j]._id);
			console.log("Given ID: ",req.body.id);
			if(chefRecipe.recipe[j]._id.equals(targetObjId))
			{
				pos = j;
				break;
			}
		}

		if(pos!=-1)
		{

			chefRecipe.recipe[pos].price = req.body.new_price;
			chefRecipe.save()
			.then((result2)=>
			{
				res.status(201).json({
				message:"Price updated!",
				});
			}).catch((err2)=>
			{
				console.log("Error while updating Price!")
				console.log('Saving Price Err\nPromise Error Caught!');
				res.status(500).json(err2);


			});
		}else
		{
			continue;
		}


	}
		if (pos===-1)
			res.status(500).json("Object ID Error");



}




exports.makeDelivery = async (req,res,next)=>
{
	console.log(req.params);
	let selected_manager = null;
	try{
		selected_manager = await managerSchema.findOne({"email":req.userData.email},"store_affiliated_with").exec();
	}catch(err)
	{
		return res.status(500).json({"Manager makeDelivery Error":err});
	}

	storeSchema['store'].findOne({"name":selected_manager.store_affiliated_with}).exec()
	.then(async (result)=>
	{

		let deliveryPerson = null;
		try{
			deliveryPerson = await deliverySchema.findOne({"email":req.params.deliveryPersonEmail}).exec(); 
		}catch(err)
		{
			return res.status(500).json("Manager Make Delivery. Finding Delivery Error Caught! ", err);
		}

		if(result.current_orders.length!=0)
		{
			deliveryPerson.current_orders.push(result.current_orders[0]);
			result.current_orders.splice(0,1);

			Promise.all([result.save(),deliveryPerson.save()]).
			then(result=>
			{
				return res.status(200).json({"message":"Order has been sent to the delivery Person!"});
			})
			.catch(err=>{
				return res.status(500).json("Manager Make Delivery. Order Sending Promise Error Caught!\n", err);
			})
		}
		else{
			return res.status(500).json({"message":"This store has no current ordrers yet!"});
		}

		
		
	}).catch((err)=>
	{
		return res.status(500).json({
			message:"Manager Make Delivery Getting Store Database Error",
			error: err
		})
	});
}

/*
	Requires id of the complaint


	Sample Input:
		{
		"id":"5af0be6a7030fd10a44fa352"
		}
*/

exports.handleComplaint = (req,res,next)=>
{
	managerSchema.findOne({"email":req.userData.email})
	.then(result=>
	{
		let pos = -1;
		for(let i =0; i<result.customer_complaints.length; ++i)
		{	
				console.log(result.customer_complaints[i].id)
			if(result.customer_complaints[i].id.equals(req.body.id))
			{	pos = i; break;}
		}

		if(pos!=-1)
		{
			result.customer_complaints.splice(pos,1);
	
			result.save()
			.then(result=>
			{
				return res.status(200).json({"message":"Complaint Handled succesfully!"});
			}).catch(err=>
			{
				return res.status(400).json({
					error:"Manager handleComplaint saving failiure"
				})
			});
			
		}
		else
		{
			return res.status(400).json({
			message:"Manager handleComplaint Failiure"
			})
		}

	})
	.catch(err=>
	{
		return res.status(500).json({
			message:"Manager handle Complaint getting manager Database Error",
			error: err
		})


	});
}

exports.getMyInfo = (req,res,next)=>
{
	managerSchema.findOne({"email":req.userData.email})
	.then(result=>
	{
		return res.status(200).json(result);
	})
	.catch(err=>
	{
		return res.status(500).json({
			message:"Manager getInfo Database Error",
			error: err
		})
	});
}

