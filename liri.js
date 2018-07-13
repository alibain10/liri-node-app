require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('spotify');

var mySpotify = require('node-spotify-api');
var keys = require("./keys");
var input = process.argv[2];
var request = require("request");



switch (input) {
    case "my-tweets":
        myTweets();

        break;

    case "spotify-this-song":
         mySpotify();


        break;

    case "movie-this":
    movieThis(thing);
        break;

    case "do-what-it-says":
    random();
        break;

}



function myTweets() {
    var client = new Twitter(keys.twitter);
    var params = { screen_name: 'Ruby Texas' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        //console.log(JSON.stringify(tweets)

        for (var i = 0; i < tweets.length; i++) {

            // Print each element (item) of the array/
            console.log(tweets[i].text);
        }
    });


    /*request("", function (error, response, body) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            // Then log the body from the site!
            console.log(body);
        }

        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");

        // Loop Through the newly created output array
        for (var i = 0; i < output.length; i++) {

            // Print each element (item) of the array/
            console.log(output[i]);
        }
    })*/



}
//Spotify function START
function mySpotify(thing) {
    var spotify = new Spotify(
        {id: '44b29a1d194143f2ac11b844d4e9c6ff',
        secret: '343bf29302d641448a35c5cd62b39a6f'});
        //keys.spotify);
    //console.log("Spotify function called.");
     if (thing == null) {
        thing = 'The Sign';
    }
    spotify.search({
    	type: 'track',
    	query: thing 
    }, function(error, data) {
        if (error) {
        	console.log('Error occurred: ' + error);
        	return;
			}
            console.log('--------------------');
            console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
            console.log('Song Title: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('--------------------');
    });
}
/*function mySpotify() {
    spotify.search({ type: 'track', query: input }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;  //from spotify npm docs
      }
      else{
      var songInfo = data.tracks.items[0];
      var songResult = console.log(songInfo.artists[0].name)
                       console.log(songInfo.name)
                       console.log(songInfo.album.name)
                       console.log(songInfo.preview_url)
      console.log(songResult);
      };
    });
  }  */

  function movieThis(thing) {
    //console.log("OMDB function called.");
    if (thing == null) {
        thing = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t="+thing+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('--------------------');
            console.log('Movie Title: ' + JSON.parse(body).Title);
            console.log('Release Year: ' + JSON.parse(body).Year);
            console.log('IMDb Rating: ' + JSON.parse(body).imdbRating);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Lead Actors: ' + JSON.parse(body).Actors);
            console.log('--------------------');
        }
    });
}
//OMDB function END

function random() {
    //console.log("Read text function called.");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
            //var dataArr = data.split(',');
            spotifyThis(data[1]);
        }
    //console.log(data);
    });
}