const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../env");
const chefSchema = require('../models/chefSchema');
const stores = require('../stores_list');
const storeSchema = require("../models/storeSchema");



exports.get_all_unregistered = (req,res,next)=>
{
	return res.send(stores);
}

exports.get_all = (req,res,next)=>
{
	storeSchema['store'].find().exec()
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
			message:"Database Error",
			error: err
		})
	});
}

/*
	Finds Chef Details
	Input: Chef email given on URL
	Output: JSON Data of that chef
	Example: /store/getChef/chef1@test.com
*/

exports.find_Chef_by_email = (req,res,next) =>
{
	console.log(req.params);
	chefSchema['chef'].findOne(req.params)
	.then(result=>{
		if(result)
		{
			return res.status(202).json(result);
		}else
		{
			return res.status(409).json({
					message:"No Chef under that email found!"
				});
		}
	}).catch(err=>{
		return res.status(500).json({
					message:"Finding Chef Database Error!"
				});
	});
}

/*
	Gets all the menu for the given Pizza Store
	Input: store name on URL:  /store/store_name/getAllMenu
	Output: Array of all the recipe
	Example: /store/ABC Pizza Store/getAllMenu
	Returns: [
    [
        {
            "rating": 0,
            "_id": "5ac248440420e9749c419ae4",
            "name": "Pineapple Pizza",
            "price": 20,
            "description": "Pizza topped with tomato sauce, cheese, pineapple, and Canadian bacon or ham. Some versions may include peppers, mushrooms, or bacon"
        },
        {
            "rating": 0,
            "_id": "5ac27832ef5fbc86664e56f3",
            "name": "Apple Pizza",
            "price": 18,
            "description": "Pizza topped with tomato sauce, cheese, pineapple, and Canadian bacon or ham. Some versions may include peppers, mushrooms, or bacon"
        }
    ]
]

*/

exports.getAllMenu = (req,res,next)=>
{
	storeSchema['store'].findOne({"name":req.params.name},"chefs").exec()
	.then(async result=>{
		if(!result)
		{

			return res.status(409).json({
				error_code:20,
				message:"Store not registered by Manager yet"
			});
		}
		else
		{

			let all_recipe= []
			console.log(result.chefs.email);
			for(let i =0; i<result.chefs.email.length; ++i)
			{
				try{


					let recipes = await chefSchema['chef'].findOne({"email":result.chefs.email[i]},"recipe").exec();
					if(recipes!=null)
					{

						if(recipes.recipe.length!=0)
						{
							all_recipe.push(recipes.recipe);
						}

					}
				}
				catch(err)
				{
					return res.status(500).json({
					message:"getAllMenu Database Error!",
					error:err
					});
				}

			}
			console.log("Async Test2")
			console.log(all_recipe);
			return res.status(200).json(all_recipe);
		}

	}).catch(err2=>
	{
		console.log(err2);
		return res.status(500).json({
			message:"Database Error",
			error: err2
		})
	});

}

/*
	Add Orders to the store current orders. ( POST Request)
	Input:
		{
			"name":"batman",
			"items":[
				{
						"name":"Apple Pizza",
						"quantity":18
				},
				{
					"name":"Pineapple Pizza",
					"quantity": 20
				}
			],
			"destination":"160 Convent Ave NY NY"


		}

	Output:
			{
		    "message": "Created Order!",
		    "unique_conifmration": 1522797520040
		}


*/

exports.add_order = (req,res,next) =>
{
	const confirmed= Date.now();
	storeSchema['store'].findOne(req.body.store_name).exec()
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
				confirmation:confirmed,
				destination:req.body.destination,
				phone_number:req.body.phone_number
				
			});
			result.current_orders.push(order);
			result.save()
			.then((result2)=>
			{
				console.log(result2);
				res.status(201).json({
				message:"Created Order!",
				unique_conifmration: confirmed
			});
			}).catch((err)=>
			{
				console.log("Error!\n",err)
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


// Sign Up for the Store
//Assuming the Customer already signed up as user and is LOGGED IN
/*
	Example:
		Input: store/signup/A 57th St Pizza Store
		Output:
			{
				message:"User succesfully listed on Pending List. Manager Needs to Approve!"
			}
			OR
			{
			    "message": "Database Error",
			    "error": "User Already on Pending List"
			}

*/


exports.sign_up = (req,res,next) =>
{
	console.log(req.params.name);
	storeSchema['store'].findOne({"name":req.params.name}).exec()
	.then(async(result)=>
	{

		// console.log("Request of User: ",req.userData);
		if(result.length<1){
			return res.status(409).json({
					message:"No Store Registered by Manager Yet!"
				});
		}else
		{

			let x = result;

			for(let i = 0 ; i< x.pending_customers.email.length;++i)
				if(x.pending_customers.email[i] === req.userData.email)
					return res.status(409).json({message:"User Already on Pending List"});


			result.pending_customers.email.push(req.userData.email);
			result.save()
			.then((result2)=>
			{
				console.log(result2);
				res.status(201).json({
				message:"User succesfully listed on Pending List. Manager Needs to Approve!",
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



// Get Top 3 Stores
exports.getTopThree =  (req,res,next)=>{

	storeSchema['store'].find().sort({"rating":-1}).limit(3).exec()
	.then((result)=>
	{
		if(result.length<1){
			return res.status(409).json({
					message:"No Store Registered by Manager Yet!"
				});
		}else
		{
			var distance = require('google-distance');
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

//Rate Store Test
/* Should be implemented on Customers.  Customer can only 
	rate if they are in Store's Registered Customer list

	Only provide rate change method for those customers on pending
*/

exports.changeRating = async (req,res,next)=>{
	// storeSchema['store'].findOneAndUpdate({"name":req.params.name},{"rating":req.params.rating},{"new":true})
	// .then((result)=>
	// {
	// 	if(result.length<1){
	// 		return res.status(409).json({
	// 				message:"No Store Registered by Manager Yet!"
	// 			});
	// 	}else
	// 	{
	// 		return res.status(202).json(result);
	// 	}
	// }).catch((err)=>
	// {
	// 	return res.status(500).json({
	// 		message:"Change Rating; Database Error ",
	// 		error: err
	// 	})
	// });
	let storeObj = null;
	try{

		storeObj = await storeSchema['store'].findOne({"name":req.params.name})

	}catch(err)
	{
		console.log("Customer rate delivery Error: ",err);
		return res.status(500).json({
			message:"Error DB Store Rate Delivery!",
			error:err
		})
	}


	if(storeObj.length<1)
	{
			return res.status(409).json({
					message:"No Store Found By that email!"
				});
	}else
	{
		const totalRating = parseInt(storeObj.totalRating);
		storeObj.rating = (parseInt(storeObj.rating) + parseInt(req.params.rating))/totalRating;
		storeObj.totalRating++;
	}
	

	storeObj.save()
	.then(result=>
	{
		return res.status(202).json({message:"Update Successful!"});

	})
	.catch(err=>{
		console.log("Store Rate Update Error: ",err);
		return res.status(500).json({
			message:"Error DB Store Rate Delivery!",
			error:err
		})
	});


}




