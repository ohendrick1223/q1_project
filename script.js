(function() {
    "use strict";

    // $.ajaxSetup({cache:false});

    $('.back-to-top').hide(); //bug fix for b2top btn

    $('.parallax').parallax(); //initialize parallax

    var quotesQuery = 'http://quotes.rest/quote.json?maxlength=100&author=carl%20sagan&api_key=ZkXJZcqV_BbAAwTS_A93NAeF';
    var picQuery = 'https://api.nasa.gov/planetary/apod?api_key=omVNer26rAfPOkqm3gxZvnjwPJxr6OACKPBuh34M';
    var ufoQuery = 'https://www.quandl.com/api/v3/datasets/NUFORC/SIGHTINGS.json?api_key=xAux-zbcJXrBiFy32jqC&start_date=2015-10-31';

    // =============quote request===========
    $.getJSON(quotesQuery)
        .done(function(data) {
            if (data.error) {
                console.log("there was an error");
            } else {
                // console.log(data);
                var author = data.contents.author;
                var quote = data.contents.quote;
                $("#quoteDiv").html("<p>" + "<i class='medium material-icons'>format_quote</i>" + quote + "<i class='medium material-icons'>format_quote</i>" + "</p>");
                $("#authorDiv").html("<p>" + "-" + author + "</p>");
            }
        });

    // $.ajaxSetup({cache:true});

    // ================pic of day request========
    $.getJSON(picQuery)
        .done(function(data) {
            //console.log(data);
            var allImages = [];
            if (data.error) {
                console.log('there was an error');
            } else {
                var date = moment(data.date);
                // console.log(date);
                for (var i = 0; i < 30; i++) {
                    var DataForPage = 'https://api.nasa.gov/planetary/apod?api_key=lWSexX3DkOyuXuh0V67U54MI7UAuFEyySVEFFJkz&date='

                    // + date.subtract(1, 'days').format('YYYY-M-DD');

                    //This formatting creates a 500 server-side error, because .moment(date) method updates a good 6 hours before it's actually updating, and thus can't find a url for "tomorrow".
                    +date.format('YYYY-M-DD');
                    date.subtract(1, 'days')

                    //queries url (which is equal to current day and previous seven dates/metadata associated.)
                    allImages.push($.getJSON(DataForPage));
                }
                Promise.all(allImages).then(function(results) {
                    for (var i = 0; i < results.length; i++) {
                        renderImage(results[i]);
                    }
                    $('.materialboxed').materialbox();
                });
            }
        });
    // ============dynamically adding imgs to html=======
    //
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
        $img.attr('src', pic).addClass('image-override col s12 materialboxed z-depth-5');
        $('#results')
            // .append($('<li>')
            .append($('<div>')
                .append($img)

                .append($("<div>").html("<p class='dateDiv dateBox'>" + moment(date).format('MMMM Do YYYY') + "</p>").addClass('center-align white-text'))

                .append($("<div>").html("<p class='title'>" + title + "</p>").addClass('col s12 flow-text valign-wrapper center-align titleFont'))

                .append($('<div>').html("<p>" + content + "</p>").addClass('card-content contentFont flow-text section'))
            );
    }
    // ==============back to top button========
    var offset = 3000;
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

    // ========UFO request=============
    $.getJSON(ufoQuery)
        .done(function(data) {
            var allMonths = [];
            var allCounts = [];
            //console.log(data.dataset.data);
            if (data.error) {
                console.log('there was an error');
            } else {
                var ufoData = data.dataset.data;
                for (var prop in ufoData) {
                    //console.log(ufoData[prop][0]);
                    //console.log(ufoData[prop][1]);
                    allMonths.push(ufoData[prop][0]);
                    allCounts.push(ufoData[prop][1]);
                }
                var renderUfo = function(data) {
                    for (var m = 0; m < allMonths.length; m++) {
                        $("#tbodyMonth").append($("<tr>").html("<td>" + allMonths[m] + "</td>"));
                        $("#tbodyCount")
                            .append($("<tr>").html("<td>" + allCounts[m] + "</td>"));
                    }
                };
                renderUfo(data);
              }
        });

})();
