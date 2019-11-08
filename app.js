var express    = require('express'),
	bodyParser = require('body-parser'),
	mongoose   = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect('mongodb://localhost:27017/yelp_venue', { useNewUrlParser: true, useUnifiedTopology: true});

var startVenues = [
	{name: "Red Rocks Amphitheatre", image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/denver/Courtesy_of_Denver_Arts_Venues_photo_by_Stevie_Crecelius_54d857ea-c300-4659-a529-2f9b6c7af129.jpg", desc: "an open-air amphitheatre built into a rock structure near Morrison, Colorado, 10 miles (16 km) west of Denver"},	
	{name: "Gorge Amphitheatre", image: "https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/641609/8bae6467-eb68-4e07-979f-83b9445f9506.jpg", desc: "offers sweeping and majestic views of the Columbia River as it skirts the foothills of the Cascade Range southbound, as well as extreme eastern Kittitas County and extreme western Grant County"},
	{name: "Hollywood Bowl", image: "https://ucarecdn.com/8ae9952d-6848-4d2a-9b5b-69c5578c2e9d/", desc: "The Hollywood Bowl is known for its band shell, a distinctive set of concentric arches that graced the site from 1929 through 2003. The shell is set against the backdrop of the Hollywood Hills and the famous Hollywood Sign to the northeast."},	
	{name: "Madison Square Garden", image: "https://www.veggiehappy.com/wp-content/uploads/2018/10/Madison-Square-Garden.png", desc: "a multi-purpose indoor arena in New York City. Located in Midtown Manhattan between 7th and 8th Avenues from 31st to 33rd Streets, it is situated atop Pennsylvania Station"}
];

// SCHEMA SETUP
var venueSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Venue = mongoose.model("Venue", venueSchema);

/**
startVenues.forEach(function(venue){
	Venue.create({
		name: venue.name,
		image: venue.image,
		description: venue.desc
	}, function(err, venue){
		console.log("Added new venue " + venue.name);
	});
});
**/

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/venues", function(req, res){
	Venue.find({}, function(err, allVenues){
		if (err){
			console.log(err);
		} else {
			res.render("index", {venues: allVenues});
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
	res.render("new.ejs");
});

app.get("/venues/:id", function(req, res){
	Venue.findById(req.params.id, function(err, foundVenue){
		if (err){
			console.log(err);
		} else {
			res.render("show", {venue: foundVenue});
		}
	});
});

app.listen(3000, function(){
	console.log("Listening on port 3000 YelpCamp server....");
});