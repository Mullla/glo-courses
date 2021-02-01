//import { addZero } from './supScript.js';

export const radioPlayerInit = () => {
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioNav = document.querySelector('.radio-navigation');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');

  const audio = new Audio(); 
  /*вызываем функцию-конструктор аудио, она создает объект и вернет его в переменную, те мы создаем объект, а не получаем его со страницы как у видеоплеера*/
  audio.type = 'audio/aac';

  const changeIconPlay = () => {
    if(audio.paused) {
      radio.classList.remove('play'); 
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play'); //когда радио запущено, запускается css-анимация: крутится динамик
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  };

  radioStop.disabled = true; //изначально кнопка play отключена

  const selectItem = elem => {//функция принимает на вход элемент
    radioItem.forEach(item => item.classList.remove('select'));//убираем у всех select
    elem.classList.add('select');//добавляем серый ободок у выбранной радиостанции
  }

  radioNav.addEventListener('change', event => { 
    /*каждый раз при клике на какой-то из радио-кнопок у всей формы возникает событие change, event реализовывает делегирование, этот объект создается во время любого события */

    const target = event.target; 
    /*target - тот элемент, который вызвал событие, у target как раз есть дата-атрибут, который и содержит информацию о радиостанции*/

    const parent = target.closest('.radio-item');
    /* метод closest ищет родителя с заданным селектором, и поднимается по родителю, потом родителю родителя и тд, если не найдет такой селектор, то вернет null*/

    const title = parent.querySelector('.radio-name').textContent; //получаем названия радиостанций
    const urlImg = parent.querySelector('.radio-img').src;

    radioHeaderBig.textContent = title;
    radioCoverImg.src = urlImg;
    radioStop.disabled = false;
    audio.src = target.dataset.radioStation;

    selectItem(parent);
    audio.play();
    changeIconPlay();
  });

  radioStop.addEventListener('click', () => {
    if(audio.paused){
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });
};