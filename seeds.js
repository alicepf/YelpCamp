var mongoose = require("mongoose");
var Venue = require("./models/venue");
var Comment = require("./models/comment");

var startVenues = [
	{
		name: "Red Rocks Amphitheatre", 
		image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/denver/Courtesy_of_Denver_Arts_Venues_photo_by_Stevie_Crecelius_54d857ea-c300-4659-a529-2f9b6c7af129.jpg",
		desc: "an open-air amphitheatre built into a rock structure near Morrison, Colorado, 10 miles (16 km) west of Denver"
	},	
	{
		name: "Gorge Amphitheatre",
		image: "https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/641609/8bae6467-eb68-4e07-979f-83b9445f9506.jpg",
		desc: "offers sweeping and majestic views of the Columbia River as it skirts the foothills of the Cascade Range southbound, as well as extreme eastern Kittitas County and extreme western Grant County"
	},
	{
		name: "Hollywood Bowl",
		image: "https://ucarecdn.com/8ae9952d-6848-4d2a-9b5b-69c5578c2e9d/", 
		desc: "The Hollywood Bowl is known for its band shell, a distinctive set of concentric arches that graced the site from 1929 through 2003. The shell is set against the backdrop of the Hollywood Hills and the famous Hollywood Sign to the northeast."
	},	
	{
		name: "Madison Square Garden", 
		image: "https://www.veggiehappy.com/wp-content/uploads/2018/10/Madison-Square-Garden.png", 
		desc: "a multi-purpose indoor arena in New York City. Located in Midtown Manhattan between 7th and 8th Avenues from 31st to 33rd Streets, it is situated atop Pennsylvania Station"
	}
];

function seedDB(){
	Venue.remove({}, function(err){
		if (err){
			console.log(err);
		} else {
			console.log("removed venues!");

			// add a few campgrounds
			startVenues.forEach(function(venue){
				Venue.create({
					name: venue.name,
					image: venue.image,
					description: venue.desc
				}, function(err, venue){
					if (err){
						console.log(err);
					} else {
						console.log("Added new venue " + venue.name);
						
						// create a comment
						Comment.create(
							{
								text: "This place is great, but I wish there was internet.",
								author: "Homer"
							}, function(err, comment){
								if (err){
									console.log(err);
								} else {
									venue.comments.push(comment);
									venue.save();
									console.log("Created new comment.");
								}
							})
					}
				});
			});
		}
	});
}

module.exports = seedDB;