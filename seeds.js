var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
			{ name: "Cloudy Camp", image:"https://pixabay.com/get/g1208a50e8eb6da46d8a3a01a5b6f0e70007226fc2df5fd67c8b628448d60a129ce5c777bf968fbc6464225afb75bb308_340.jpg",
description: "Camp is an aesthetic style and sensibility that regards something as appealing because of its bad taste and ironic value.Camp aesthetics disrupt many of modernism's notions of what art is and what can be classified as high art by inverting aesthetic attributes such as beauty, value, and taste through an invitation of a different kind of apprehension and consumption"
			},
	{ name: "Mountain Camp", image:"https://pixabay.com/get/g7543342bb05be62403e7515e10d35c66197dd9ef1abd2b85ca61702d37da196c9b8b138d6e5f0dec44c26ddf235e9450_340.jpg",
			 description: "Camp is an aesthetic style and sensibility that regards something as appealing because of its bad taste and ironic value.[1] Camp aesthetics disrupt many of modernism's notions of what art is and what can be classified as high art by inverting aesthetic attributes such as beauty, value, and taste through an invitation of a different kind of apprehension and consumption"
			},
	{ name: "Alone Camp", image:"https://pixabay.com/get/g6c6d7dc01099173f2735ea8aa8715dbc8706e5fb9f14280009eba8f12b3bf4fd68e23c12d2a40689c8ace9d25d9785ae_340.jpg",
			 description: "Camp is an aesthetic style and sensibility that regards something as appealing because of its bad taste and ironic value.[1] Camp aesthetics disrupt many of modernism's notions of what art is and what can be classified as high art by inverting aesthetic attributes such as beauty, value, and taste through an invitation of a different kind of apprehension and consumption"
			}
		   
		   ]

function seedDB(){
Campground.remove({},function(err){
	if(err) {
		console.log(err);
	}else{
		console.log("removed Campgrounds!!");
		// add few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err,campground){
				if(err){
					console.log(err);
				}else{
					console.log("Campground added!!")
					// add few comments
					Comment.create( {
						text: "This is a beautiful place. Hope the internet will work here!!",
						author: "Ben10"
					}, function(err,comment){
						if(err){
							console.log(err)
						}else{
							campground.comments.push(comment);
							campground.save();
							console.log("New comment added!!");
						}
					});
				}
			});
		});
 
	}
	
 });
}

module.exports = seedDB;