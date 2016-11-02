(function() {
    "use strict";

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
            var allImages = [];
            if (data.error) {
                console.log('there was an error');
            } else {
                var date = moment(data.date);
                for (var i = 0; i < 30; i++) {
                    var DataForPage = 'https://api.nasa.gov/planetary/apod?api_key=lWSexX3DkOyuXuh0V67U54MI7UAuFEyySVEFFJkz&date=' + date.format('YYYY-M-DD');

                    date.subtract(1, 'days')
                        //queries url (which is equal to current day and previous seven dates/metadata associated.)
                    allImages.push($.getJSON(DataForPage));
                }
                Promise.all(allImages).then(function(results) {
                    for (var i = 0; i < results.length; i++) {
                        renderImage(results[i]);
                    }
                    $('.materialboxed').materialbox();
                })
            }
        });

    function renderImage(data) {
        var title = data.title;
        var pic = data.url;
        var content = data.explanation;
        var date = moment(data.date);
        var $img = $('<img>');
        $img.error(function() {
            // console.log('error', $(this));
            $(this).attr('src', 'img/no-image-placeholder.png');
        });
        $img.attr('src', pic).addClass('image-override col s12 materialboxed z-depth-5')
        $('#results')
            // .append($('<li>')
            .append($('<div>')

                .append($img)

                .append($("<div>").html("<p class='dateDiv dateBox'>" + moment(date).format('MMMM Do YYYY') + "</p>").addClass('center-align white-text'))


                .append($("<div>").html("<p class='title'>" + title + "</p>").addClass('col s12 flow-text valign-wrapper center-align titleFont'))


                .append($('<div>').html("<p>" + content + "</p>").addClass('card-content contentFont flow-text section'))
            );
    }

    var offset = 250;
    var duration = 300;

    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });

    $('.back-to-top').click(function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });


})();
