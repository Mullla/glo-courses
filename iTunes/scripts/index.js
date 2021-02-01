import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach(item => item.classList.remove('active'));
  playerBlock.forEach(item => item.classList.remove('active'));
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    deactivationPlayer(); //?те сначала у всех элементов убирается активный класс, а потом какому-то добавляется, на каждом переборе
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
  }));

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();

/!для многостраничных сайтов, если на страницах есть не все элементы из скрипта!/
/* try{
  videoPlayerInit();
} catch (e){
  console.log(e);
}*/