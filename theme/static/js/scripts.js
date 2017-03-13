jQuery(document).ready(function () {
  var $ = jQuery;
  var isFixed = false;
  var body  = $('body');

  $(window).on('scroll', function() {
    var topDist = $(window).scrollTop();
    if (topDist > 280 && !isFixed) {
      body.addClass('fixed');
      isFixed = true;
    }
    else if (topDist <= 280 && isFixed) {
      body.removeClass('fixed');
      isFixed = false;
    }
  });

});
