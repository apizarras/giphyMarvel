$(document).ready(function() {

    var queries = [];

    function displayGiffs() {
      $("#giff-view").empty();
        // var giphyInput = $("#giphy-input").val().trim();
        console.log("clicked to display giffs");
        // console.log(giphyInput);
        var giff = $(this).attr("data-name");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=qPURq4UwMeTT2SyFSwN89J5I43gwQHGF&q=" + giff + "&limit=8&offset=0&rating=G&lang=en"
        //setup ajax call
        $.ajax( {
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            for(var i=0; i <results.length; i++) {
            console.log(results[i]);
            var giffDiv = $("<div>");
            var rating = results[i].rating;
            var ratingDiv = $("<p>").text("Rating: " + rating);
            console.log("rating: " + results[i].rating);
            var imgURL = results[i].images.url;
            var image = $("<img>").attr("src", results[i].images.fixed_height_small_still.url);
            image.addClass("giff");
            giffDiv.addClass("float-left");
            image.attr("data-state", "still");
            image.attr("data-still", results[i].images.fixed_height_small_still.url);
            image.attr("data-animate", results[i].images.fixed_height_small.url);
            
            console.log(results[i].embed_url);
            giffDiv.append(ratingDiv);
            giffDiv.append(image);
            $("#giff-view").prepend(giffDiv)
            }
        });
    }
    function displayButtons() {
        $("#buttons").empty();
        for (var j=0; j < queries.length; j++) {
            console.log(queries)
            var button = $("<button>");
            button.addClass("giff-btn button");
            button.attr("data-name", queries[j]);
            button.text(queries[j]);
            const button2 = $("<button>").addClass("giff-btn").attr("data-name", queries[j]).text(queries[j]);
            console.log(queries[j]);
            $("#buttons").append(button);
        }
    }

    $("#add-giff").on("click", function(event) {
        event.preventDefault();
        var giff = $("#giphy-input").val().trim();
        queries.push(giff);
        console.log(giff);
        displayButtons();
        // displayGiffs();
    });

$(document).on("click", ".giff-btn", displayGiffs);

$(document).on("click", ".giff", function() {
    var state = $(this).attr("data-state");
    console.log("giff has been clicked");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

//this is the closing for document.ready
});