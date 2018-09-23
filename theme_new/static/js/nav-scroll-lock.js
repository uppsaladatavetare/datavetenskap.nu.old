jQuery(document).ready(function () {
  var $ = jQuery;
  var isFixed = false;
  var nav  = $('nav');

  $(window).on('scroll', function() {
    var topDist = $(window).scrollTop();
    if (topDist > 280 && !isFixed) {
      nav.addClass('fixed');
      isFixed = true;
    }
    else if (topDist <= 280 && isFixed) {
      nav.removeClass('fixed');
      isFixed = false;
    }
  });
});
