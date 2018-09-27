jQuery(document).ready(function ($) {
    var nav = $("nav");
    var target = $(".index-header");

    limit = target.position().top - nav.outerHeight();

    $(window).on('scroll', function () {
        var st = $(this).scrollTop();

        if (st <= limit)
            nav.css({ 'opacity': (st / limit) });
        else
            nav.css({ 'opacity': 1 });

    });
});


jQuery(document).ready(function ($) {
    $(".banner").paroller({ factor: 0.5, factorXs: 0.2, factorSm: 0.3, type: 'background', direction: 'vertical' });  
})