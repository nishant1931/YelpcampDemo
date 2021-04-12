var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
	flash       = require("connect-flash"),
	passport    = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	passportLocalMongoose = require("passport-local-mongoose"),
	Campground  = require("./models/campground"),
	Comment     = require("./models/comment"),
    User        = require("./models/user"),
	seedDB      = require("./seeds");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb+srv://colt:colt1234@cluster0.shqvw.mongodb.net/Yelp_camp?retryWrites=true&w=majority", {
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology: true
}).then(() => {
	console.log("connected to DB");
}).catch(err => {
	console.log("ERROR",err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Yelpcamp demo project",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);


// Campground.create(

// {   name: "BONFIRE CAMP", image:"https://pixabay.com/get/g0c31dd709196b234943017981261958c70ee284ed8bbe8ad5a536294d8c3479eaac62ba480d1410250ac21da1ba26e46_340.jpg", description:"This is another campground with Bonfire. You can enjoy here under the stars."
// }, function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("HURRAY A NEW CAMPGROUND ADDED!!");
// 		console.log(campground);
// 	}
// });

// var campgrounds = [
// 		{name: "HIMALAYA YELPCAMP", image:"https://pixabay.com/get/g80253d2543923afc9262a74cbd58c20c5aecf6c0882afcfa7cfe2162b232eade899a4b2c0a8fd8b4d29b68e348296cf6_340.jpg"},
// 		{name: "NIGHT YELPCAMP", image:"https://pixabay.com/get/g4f5f486653645824d113b896d14dbc804c9f37a16be01e89a693decc73503d0e3adeabcf809068ad5f6be50d19a8c60d_340.jpg"},
// 		{name: "MORNING YELPCAMP", image:"https://pixabay.com/get/g238234e322737cce1da8218c0343dc94b07ecbce8072739f9bf1579e27f1d2f2a9dce6a6f29fd4eda32c7b51ab6b0d54_340.jpg"}, {name: "HIMALAYA YELPCAMP", image:"https://pixabay.com/get/g80253d2543923afc9262a74cbd58c20c5aecf6c0882afcfa7cfe2162b232eade899a4b2c0a8fd8b4d29b68e348296cf6_340.jpg"},
// 		{name: "NIGHT YELPCAMP", image:"https://pixabay.com/get/g4f5f486653645824d113b896d14dbc804c9f37a16be01e89a693decc73503d0e3adeabcf809068ad5f6be50d19a8c60d_340.jpg"},
// 		{name: "MORNING YELPCAMP", image:"https://pixabay.com/get/g238234e322737cce1da8218c0343dc94b07ecbce8072739f9bf1579e27f1d2f2a9dce6a6f29fd4eda32c7b51ab6b0d54_340.jpg"}
// 	]







function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
	   return next();
	   }
	res.redirect("/login");
}

app.listen(3000,function(){
	console.log("The Yelpcamp has started!");
});