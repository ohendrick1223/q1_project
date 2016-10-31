(function() {
        "use strict";

        // append data of APOD to card with class of .apod
        var quotesQuery = 'http://quotes.rest/quote.json?maxlength=100&author=carl%20sagan&api_key=ZkXJZcqV_BbAAwTS_A93NAeF';
        // console.log(quotesQuery);
        var podQuery = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
        //console.log(podQuery);
        var $xhr = $.getJSON(quotesQuery);
        $xhr.done(function(data) {
                if ($xhr.status !== 200) {
                    console.log("there was an error")
                    return;
                } else {
                  //console.log(data);
                    var author = data.contents.author;
                    var quote = data.contents.quote;
                    // console.log(quote);
                    // console.log(author);
                    $("#quote").html("<p>" + quote + "</p>");
                    $("#author").html("<p>" + author + "</p>");
                }
            });

            var $xhr = $.getJSON(podQuery);
            $xhr.done(function(data) {
                    if ($xhr.status !== 200) {
                        console.log("there was an error")
                        return;
                    } else {
                      var img = data.url;
                      //console.log(img);

                        //append URL of IMG to CARD.
                    }
                });











        })();
