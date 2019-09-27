$(document).ready(function () {
    var animals = [
        "cow",
        "manatee",
        "sea lion",
        "kitten",
        "rabbit",
        "hedgehog",
        "sloth",
        "red panda",
        "corgi",
        "miniature pig",
        "sea otter",
        "slow loris",
        "husky",
        "anteater",
        "dachsund",
        "fennec fox",
        "bulldog",
    ];

    addButtons();

    function addButtons() {
        $("#buttons").empty();
        for (var i = 0; i < animals.length; i++) {
            var newButtons = $("<button>");
            newButtons.addClass("animal");
            newButtons.attr("data-name", animals[i]);
            newButtons.text(animals[i]);
            $("#buttons").append(newButtons);
        }
    }

    $("#animal-search").on("click", function (event) {
        event.preventDefault();

        var animal = $("#animal-input").val().trim();
        animals.push(animal);

        addButtons();

        $("#animal-input").val("");
    });

    $(document).on("click", ".animal", function () {
        $("#animal-gifs").empty()

        var clickedButton = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedButton + "&api_key=UDnHaML50rrBgAFrYdnST2W2ALdUdw5I";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var data = response.data;

            for (i = 0; i < data.length; i++) {
                var gifDiv = $("<div>");
                var gifImg = $("<img>");

                gifDiv.addClass("gif-div");
                gifImg.addClass("gif-img");
                gifImg.attr({
                    'src': data[i].images.original_still.url,
                    'data-state': "still",
                    'data-still': data[i].images.original_still.url,
                    'data-animate': data[i].images.original.url
                });

                var pTag = $("<p>").html("Rated: " + data[i].rating + "/n Title: " + data[i].title);
                gifDiv.append(gifImg);
                gifDiv.append(pTag);
                $("#animal-gifs").prepend(gifDiv);
            }

            

        });
    });

    $(document).on("click", ".gif-img", function() {
        var gifState = $(this).attr("data-state");
        var gifAnimate = $(this).attr("data-animate");
        var gifStop = $(this).attr("data-still");

        if (gifState === "still") {
            $(this).attr("data-state", "animate");
            $(this).attr("src", gifAnimate);
        }else if (gifState === "animate") {
            $(this).attr("data-state", "still");
            $(this).attr("src", gifStop);
        }
    });

})