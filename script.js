(function() {
        "use strict";

        var quotesQuery = 'http://quotes.rest/quote.json?maxlength=100&author=carl%20sagan&api_key=ZkXJZcqV_BbAAwTS_A93NAeF';
        // console.log(quotesQuery);
        var podQuery = 'https://api.nasa.gov/planetary/apod?api_key=omVNer26rAfPOkqm3gxZvnjwPJxr6OACKPBuh34M';
        //console.log(podQuery);
        //
        // var twitterQuery =


        var quotesObject = $.getJSON(quotesQuery);
        quotesObject.done(function(data) {
                if (quotesObject.status !== 200) {
                    console.log("there was an error");
                    return;
                } else {
                    var author = data.contents.author;
                    var quote = data.contents.quote;
                    // console.log(quote);
                    // console.log(author);
                    // console.log(data);
                    $("#quoteDiv").html("<p>" + "<i class='medium material-icons'>format_quote</i>" + quote + "</p>");
                    $("#authorDiv").html("<p>" + author + "</p>");
                }
            });

            $.getJSON(podQuery)
              .done(function(data) {
                //console.log(data);
                if(data.error){
                  console.log('there was an error');
                } else {

                  var title = data.title;
                  var pic = data.url;
                  var content = data.explanation;
                  var date = moment(data.date);


                  // console.log(date.format('MMMM Do YYYY'));

                  $("#picDiv").attr('src', pic);
                  $("#titleDiv").html("<p class='center-align title'>" + title + "</p>");
                  $("#contentDiv").html("<p>" + content + "</p>");
                  $("#dateDiv").html("<p class='center-align' id='dateBox'>" + date.format('MMMM Do YYYY') + "</p>");
                }


                });













        })();
