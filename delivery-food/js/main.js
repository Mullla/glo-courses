const cartBtn = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const countBtns = document.querySelectorAll('.counter-button');
const counterFood = document.querySelector('.counter');

cartBtn.addEventListener('click', toggleModal);

close.addEventListener('click', toggleModal);

function toggleModal(){
  modal.classList.toggle('active');
};

new WOW().init();

for (let countBtn of countBtns){
  countBtn.onclick = function(){
    if(countBtn.value === "-" && counterFood.textContent>0){
      counterFood.textContent--;
    } else if(countBtn.value === "+"){
      counterFood.textContent++;
    };
  };
};


