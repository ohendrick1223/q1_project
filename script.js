(function() {
        "use strict";

        // append data of APOD to card with class of .apod
        var quotesQuery = 'http://quotes.rest/quote.json?maxlength=100&author=carl%20sagan&api_key=ZkXJZcqV_BbAAwTS_A93NAeF';

        // console.log(quotesQuery);


        var podQuery = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
        //
        // console.log(podQuery);

        var $xhr = $.getJSON(quotesQuery);
        // var author = $xhr.Object;
        // console.log(author);
        console.log($xhr);
        $xhr.done(function(data) {
                if ($xhr.status !== 200) {
                    console.log("there was an error")
                    return;
                } else {
                    // console.log(data.contents.author);
                    var author = data.contents.author;
                    console.log(author);
                     $('#author').append(author);
                }
            });









        })();
