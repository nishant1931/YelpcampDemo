var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var  middleware = require("../middleware");

router.get("/",function(req,res){
	
	// GET ALL CAMPGROUNDS FROM DB
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			 res.render("campgrounds/index",{campgrounds: allCampgrounds});
		}
	});
	
});



router.post("/", middleware.isLoggedIn ,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name, image:image, description:desc, author:author};
	 // CREATE A NEW CAMPGROUND AND SAVE TO DB
	Campground.create(newCampground, function(err, newlyCampground){
		if(err){
			console.log(err);
		}else{
			// REDIRECT TO CAMPGROUND PAGE
			req.flash("success", "Successfully added campground!") ;
	       res.redirect("/campgrounds");
		}
	});
	
});

router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
}); 


//  SHOW ROUTES


router.get("/:id", function(req,res){
	// FIND THE CAMPGROUNDS BY ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundid){
		if(err){
			console.log(err);
		}else{
			console.log(foundid);
			res.render("campgrounds/show",{campground: foundid});
		}
	});
});

// EDIT ROUTES
router.get("/:id/edit", middleware.checkCampgroundOwnership , function(req,res){
	// CHECK USER IS LOGGED IN 
	    Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
	
});


// UPDATE ROUTES 
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DELETE ROUTES
router.delete("/:id",middleware.checkCampgroundOwnership , function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
		   console.log(err);
			 
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

 


module.exports = router;