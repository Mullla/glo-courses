$(document).ready(function() {
  const mMenuBtn = $(".m-menu-button");
  const mMenu = $(".m-menu");
  const tab = $(".tab");

  const overlay = $(".overlay");
  const demo = $(".demo-modal");
  const demoBtns = $(".demo-btn");
  const modalBtn = $(".modal-btn");

  overlay.hide();
  demo.hide();

  demoBtns.on('click',function(){
    overlay.show();
    demo.show();
  });

  modalBtn.on('click', function(){
    overlay.hide();
    demo.hide();
  });

  mMenuBtn.on('click', function(){
    mMenu.toggleClass('active');
    $('body').toggleClass('no-scroll');
  });

  tab.on('click', function(){
    tab.removeClass('active');
    $(this).toggleClass('active');
    let activeTabContent = $(this).attr('data-target');
    $('.tabs-content').removeClass('visible');
    $(activeTabContent).toggleClass('visible');
  });
  
  var mySwiper = new Swiper ('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 25,
    loop: true,
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
        slidesOffsetAfter: 50,
        navigation: {
          nextEl: ".button-next",
        },
      },
    },
  });
});