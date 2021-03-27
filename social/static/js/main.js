
	  $(function() {
	  $('#topBtn').fadeOut();
	  $(window).scroll(function() {
	  if($(this).scrollTop() > 30) {
	  $('#topBtn').fadeIn();
	  } else {
	  $('#topBtn').fadeOut();
	  }
	  });
	  $('#topBtn').click(function() {
	  $('body,html').animate({scrollTop:0},700);
	  });
	  });