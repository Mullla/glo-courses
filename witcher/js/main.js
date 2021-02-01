var mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.arrow',
  },
  breakpoints: {
    540: {
      slidesPerView: 2,
    }
  }
});


var menuButton = document.querySelector('.menu-button');
var menu = document.querySelector('.header');

var overlay = document.querySelector(".overlay");
var demo = document.querySelector(".demo-modal");
var demoBtns = document.querySelectorAll(".demo-btn");
var modalBtn = document.querySelector(".modal-btn");

overlay.style.display='none';
demo.style.display='none';


for(var i = 0; i < demoBtns.length; i++){
  demoBtns[i].addEventListener('click',function(){
    overlay.style.display='block';
    demo.style.display='flex';
  });
}

modalBtn.addEventListener('click',function(){
  overlay.style.display='none';
  demo.style.display='none';
});

menuButton.addEventListener('click', function (){
  menuButton.classList.toggle('menu-button-active');
  menu.classList.toggle('header-active');
});
