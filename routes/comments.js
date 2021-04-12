// INDEX - /campgrounds ,  NEW -  /campgrounds/new  ,  CREATE - /campgrounds (Post)  , SHOW - /campgrounds/:foundid
//  NEW - /campgrounds/:id/comments/new (GET)   ,   CREATE - /campgrounds/:id/comments (POST)

// ==========================================
//  COMMENTS ROUTES
// ============================================
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var  middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req,res){
	// find campgrounds by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	});
	 
});

router.post("/", middleware.isLoggedIn , function(req,res){
	// lookup campground id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				}else{
					// add the username and id to comment 
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success", "Successfully comment sdded!");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
			// create a new comment 
			// connect comment to campground
			// redirect somewhere
		}
	});
});

// COMMENT EDIT ROUTES
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			console.log(err);
			res.redirect("back");
		} else{
			res.render("comments/edit", {campground_id : req.params.id, comment: foundComment});
		}
	});
	
});

// COMMENT UPDATE ROUTES
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	 Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}  else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	 });
});

// COMMENT DELETE ROUTES
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});




module.exports = router;

