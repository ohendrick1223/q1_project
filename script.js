(function() {
        "use strict";

        // append data of APOD to card with class of .apod
        var quotesQuery = 'http://quotes.rest/quote.json?maxlength=100&author=carl%20sagan&api_key=ZkXJZcqV_BbAAwTS_A93NAeF';
        // console.log(quotesQuery);
        var podQuery = 'https://api.nasa.gov/planetary/apod?api_key=omVNer26rAfPOkqm3gxZvnjwPJxr6OACKPBuh34M';
        //console.log(podQuery);
        var quotesObject = $.getJSON(quotesQuery);
        quotesObject.done(function(data) {
                if (quotesObject.status !== 200) {
                    console.log("there was an error");
                    return;
                } else {
                  //console.log(data);
                    var author = data.contents.author;
                    var quote = data.contents.quote;
                    // console.log(quote);
                    // console.log(author);

                    $("#quoteDiv").html("<p>" + quote + "</p>");
                    $("#authorDiv").html("<p>" + author + "</p>");
                }
            });

            var apodObject = $.getJSON(podQuery);
            apodObject.done(function(data) {
                    if (apodObject.status !== 200) {
                        console.log("there was an error");
                        return;
                    } else {
                      var title = data.title;
                      var pic = data.url;
                      // console.log(pic);
                      // console.log(title);
                      $("#picDiv").attr('src', pic);
                      $("#titleDiv").html("<p>" + title + "</p>");

                        //append URL of IMG to CARD.
                    }
                });











        })();
