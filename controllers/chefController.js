const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../env");
const chefSchema = require("../models/chefSchema");


/*
Adds Recipe
Chef must be autheticated with token
Input:
	"email": "chef1@test.com",
	"recipe":{
		"name":"Apple Pizza",
		"price":18.00,
		"description":"Pizza topped with tomato sauce, cheese, pineapple, and Canadian bacon or ham. Some versions may include peppers, mushrooms, or bacon"
	}


chefEmail, recipe
		Recipe:
			_id:mongoose.Schema.Types.ObjectId,
			name:{type:String,required:true},
			price:{type: Number, required:true},
			rating:{type:Number,required:false, default:0},
			description:{type:String,required:true}
Output: Adds that recipe to the chef's menu
*/

exports.add_recipe = (req,res,next)=>
{

	const my_recipe = new chefSchema['recipe']({
		_id: new mongoose.Types.ObjectId(),
		name:req.body.recipe.name,
		price:req.body.recipe.price,
		description:req.body.recipe.description

	});
	 console.log("Add Recipe Running...");

	let chef;
	chefSchema['chef'].findOneAndUpdate({"email":req.body.email},{$push:{"recipe":my_recipe}})
	.then(
		result=>{
			console.log(result);

			return res.status(201).json({
				message:"Recipe Added!"});
			})
	.catch(err=>{
		return res.status(500).json({
					message:"Adding Recipe Database Error!",
					"error":error
				});
		});




}


exports.my_menu = (req,res,next)=>
{
	chefSchema['chef'].findOne({"email":req.body.email},"recipe")
	.then(result=>{
		return res.status(201).json(result);
	}).catch(error=>
	{
		return res.status(500).json({
					message:"Retrieving Menu Database Error!",
					"error":error
				});	
	});


}


//Parameters :  chef_email, menu_id, new_price
/* Sample Example: 
	{
		"email":"testChef@test.com",
		"id": "5ade8a44ecaab7ac3335b83f",
		"new_price":20
	}

	Output:
	{
    	"message": "Price updated!"
	}

*/
exports.change_price = async (req,res,next)=>
{
	console.log(req.body);
		let chefRecipe = null;
		try{
			chefRecipe = await chefSchema['chef'].findOne({"email":req.body.email},"recipe").exec();
		}catch(err)
		{
			return 'Change Price: Finding Chef DB Error occured';
		}
		
		let pos = -1;
		for(let i = 0; i<chefRecipe.recipe.length; ++i)
		{
			const targetObjId = mongoose.Types.ObjectId(req.body.id);
			if(chefRecipe.recipe[i]._id.equals(targetObjId))
			{
				pos = i;
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
				res.status(500).json(err2);
				console.log('Saving Price Err\nPromise Error Caught!');

			});
		}else
		{
			res.status(500).json("Object ID Error");
		}


}
