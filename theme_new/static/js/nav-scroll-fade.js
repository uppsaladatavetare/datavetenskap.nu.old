jQuery(document).ready(function () {
    var $ = jQuery;
    var nav = $("nav");
    var main = $("main");

    limit = main.position().top - nav.outerHeight();

    $(window).on('scroll', function () {
        var st = $(this).scrollTop();

        if (st <= limit)
            nav.css({ 'opacity': (st / limit) });
        else
            nav.css({ 'opacity': 1 });

    });
});
