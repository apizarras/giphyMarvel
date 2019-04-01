$(document).ready(function() {

    var giffs = [];

    function displayGiffs() {
        $("#giff-view").empty();
        var giphyInput = $("#giphy-input").val().trim();
        console.log("clicked to display giffs");
        console.log(giphyInput);
        var giff = $(this).attr("data-name");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=qPURq4UwMeTT2SyFSwN89J5I43gwQHGF&q=" + giphyInput + "&limit=2&offset=0&rating=G&lang=en"
        //setup ajax call
        $.ajax( {
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            for(var i=0; i <results.length; i++) {
            console.log(results[i]);
            var giffDiv = $("<div class='giff'>");
            var rating = results[i].rating;
            var ratingDiv = $("<p>").text("Rating: " + rating);
            // giffDiv.append(rating);
            console.log(results[i].rating);
            var imgURL = results[i].images.url;
            var image = $("<img>").attr("src", results[i].images.fixed_height.url);
            console.log(results[i].embed_url);
            giffDiv.append(ratingDiv);
            giffDiv.append(image);
            $("#giff-view").prepend(giffDiv)
            }
        });
    }
    function displayButtons() {
        $("#buttons").empty();
        for (var j=0; j < giffs.length; j++) {
            var a = $("<button>");
            a.addClass("giff-btn");
            a.attr("data-name", giffs[j]);
            a.text(giffs[j]);
            const button2 = $("<button>").addClass("giff-btn").attr("data-name", giffs[j]).text(giffs[j]);
            $("#buttons").append(a);
        }
    }

    $("#add-giff").on("click", function(event) {
        event.preventDefault();
        var giff = $("#giphy-input").val().trim();
        giffs.push(giff);
        console.log(giff);
        displayButtons();
        // displayGiffs();
    });

$(document).on("click", ".giff-btn", displayGiffs);



    //this closes the displayGiffs function
    // }
//this is the closing for document.ready
});