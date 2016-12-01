$(function () {
  slideProjects();
  showMore();
});

/* SLIDER */
function slideProjects() {
  var slidesCount = $('.project-wrapper').find('.project-slide').length - 1,
      currentSlide = 0;
  $('.project-wrapper').find('.project-slide').eq(currentSlide).addClass('active');
  $('.project-wrapper').after('<div class="nextprev"><a class="btn btn-default project-prev"role="button"><i class="fa fa-chevron-left"></i></a> <a class="btn btn-default project-next" role="button"><i class="fa fa-chevron-right"></i></a></div>');
  $('.project-next, .project-prev').click(function() {
    if ((currentSlide >= 0) && (currentSlide <= slidesCount)) {
        if ( $(this).hasClass('project-next') ) {
           currentSlide = currentSlide + 1;
        } else if ( $(this).hasClass('project-prev') ) {
           currentSlide = currentSlide - 1;
        }
        if (currentSlide < 0) {
           currentSlide = slidesCount;
        } else if (currentSlide > slidesCount) {
          currentSlide = 0;
        }
    } 
    $('.project-wrapper').find('.project-slide.active').removeClass('active');
    $('.project-wrapper').find('.project-slide').eq(currentSlide).addClass('active');
  });
  $('.project-slide').click(function() {
    if ( !$(this).hasClass('active') ) {
      $('.project-slide-info').removeClass('hover');    
    } else if ( $(this).hasClass('active') ) {
      $(this).children('.project-slide-info').addClass('hover');
    }
  });
}

/* SHOW MORE IN "ABOUT ME" SECTION */
function showMore() {
  $('.aboutme_wrapper').before('<p class="text-center"><a class="btn btn-default aboutme_toggle" role="button">Читать дальше <i class="fa fa-chevron-down"></i></a></p>')
  $('.aboutme_toggle').click(function() {
    $(this).parent('p').siblings('.aboutme_wrapper').slideToggle('slow').toggleClass('toggled');
    if ( $(this).parent('p').siblings('.aboutme_wrapper').hasClass('toggled') ) {
      $(this).html('Закрыть <i class="fa fa-chevron-up"></i>');
    } else {
      $(this).html('Читать дальше <i class="fa fa-chevron-down"></i>');
    }
  });
}