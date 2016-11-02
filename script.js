(function() {
    "use strict";
// $('.slider').slider({full_width: true, height: '800px'});


    var quotesQuery = 'http://quotes.rest/quote.json?maxlength=100&author=carl%20sagan&api_key=ZkXJZcqV_BbAAwTS_A93NAeF';
    var picQuery = 'https://api.nasa.gov/planetary/apod?api_key=omVNer26rAfPOkqm3gxZvnjwPJxr6OACKPBuh34M';

    $.getJSON(quotesQuery)
        .done(function(data) {
            if (data.error) {
                console.log("there was an error");
            } else {
                var author = data.contents.author;
                var quote = data.contents.quote;
                $("#quoteDiv").html("<p>" + "<i class='medium material-icons'>format_quote</i>" + quote + "</p>");
                $("#authorDiv").html("<p>" + author + "</p>");
            }
        });

    $.getJSON(picQuery)
        .done(function(data) {
            //console.log(data);
            if (data.error) {
                console.log('there was an error');
            } else {
                var date = moment(data.date);
                for (var i = 0; i < 8; i++) {
                    //console.log(date);
                    var DataForPage = 'https://api.nasa.gov/planetary/apod?api_key=lWSexX3DkOyuXuh0V67U54MI7UAuFEyySVEFFJkz&date=' + date.subtract(1, 'days').format('YYYY-M-DD');
                    //queries url (which is equal to current day and previous seven dates/metadata associated.)
                    $.getJSON(DataForPage).done(renderImage);
                }
            }
        });
    function renderImage(data) {
                  var title = data.title;
                  var pic = data.url;
                  var content = data.explanation;
                  var date = moment(data.date);
        // $('#carousel')
        $('#results')
        // .append($('<li>')
            .append($('<div>')

                .append($('<img>').attr('src',pic).addClass('image-override col s12')

                    .append($("<div>").html("<p class='dateDiv dateBox'>" + moment(date).format('MMMM Do YYYY') + "</p>").addClass('center-align white-text'))
                  )

                .append($("<div>").html("<p class='title'>" + title + "</p>").addClass('col s12 flow-text valign-wrapper center-align titleFont'))


            .append($('<div>').html("<p>" + content + "</p>").addClass('card-content contentFont'))
          );

    }


})();
