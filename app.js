var express    = require('express'),
	bodyParser = require('body-parser'),
	mongoose   = require('mongoose'),
    Venue      = require('./models/venue'),
	Comment    = require('./models/comment'),
	seedDB     = require("./seeds");

seedDB();

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost:27017/yelp_venue', { useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/venues", function(req, res){
	Venue.find({}, function(err, allVenues){
		if (err){
			console.log(err);
		} else {
			res.render("venues/index", {venues: allVenues});
		}
	});
});

app.post("/venues", function(req, res){
	var venueName = req.body.name;
	var venueImage = req.body.image;
	var venueDesc = req.body.desc;
	var newVenue = {name: venueName, image: venueImage, description: venueDesc};
	Venue.create(newVenue, function(err, venue){
		if (err){
			console.log(err);
		} else {
			res.redirect("/venues");
		}
	});
});

app.get("/venues/new", function(req, res){
	res.render("venues/new");
});

app.get("/venues/:id", function(req, res){
	Venue.findById(req.params.id).populate("comments").exec(function(err, foundVenue){
		if (err){
			console.log(err);
		} else {
			res.render("venues/show", {venue: foundVenue});
		}
	});
});

// ================================
// Comments
// ================================

app.get("/venues/:id/comments/new", function(req, res){
	Venue.findById(req.params.id, function(err, venue){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {venue: venue});
		}
	});
});

app.post("/venues/:id/comments", function(req, res){
	Venue.findById(req.params.id, function(err, venue){
		if (err) {
			console.log(err);
			res.redirect("/venues");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err){
					console.log(err);
				} else {
					venue.comments.push(comment);
					venue.save();
					res.redirect("/venues/" + venue._id);
				}
			});
		}
	});
})

app.listen(3000, function(){
	console.log("Listening on port 3000 YelpCamp server....");
});