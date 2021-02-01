//import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio');
  const audioImg = document.querySelector('.audio-img');
  const audioHeader = document.querySelector('.audio-header');
  const audioPlayer = document.querySelector('.audio-player');
  const audioNav = document.querySelector('.audio-navigation');
  const audioBtnPlay = document.querySelector('.audio-button__play');
  const audioProgress = document.querySelector('.audio-progress');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioTimeTotal = document.querySelector('.audio-time__total');

  const playlist = ['hello', 'flow', 'speed']; //массив с треками, тк нет сервера, который мог бы считывать названия треков в папке

  let trackIndex = 0; //индекс той песни, которая сейчас играет

  const loadTrack = () => {//когда функция запускается, получаем значение играла ли музыка в момент переключения, если играла, то isPlayed будет false и при запуске нового трека музыка сразу запустится
    const isPlayed = audioPlayer.paused; //полцчаем значение, стоит ли сейчас пауза
    const track = playlist[trackIndex];//сохраняем трек в переменную по индексу

    audioImg.src = `./audio/${track}.jpg`;//подставляем элемент массива (плейлиста) в путь до соответствующей картинки
    audioPlayer.src = `./audio/${track}.mp3`;//подставляем элемент массива (плейлиста) в путь до трека
    audioHeader.textContent = track.toUpperCase();//подставляем название трека в заголовок

    if (isPlayed) { 
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  }

  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--;
    } else {
      trackIndex = playlist.length - 1; //переходим к последнему треку
    }
    
    loadTrack();
  }

  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0; //проверяем, если трек последний, то переключаем на самый первый
    } else {
      trackIndex ++;
    }

    loadTrack();
  };

  const addZero = n => n < 10 ? '0'+ n : n;

  audioNav.addEventListener('click', event  => {
    const target = event.target;

    if(target.classList.contains('audio-button__play')){
      audio.classList.toggle('play');
      audioBtnPlay.classList.toggle('fa-play'); //переключаем классы проигрывания и паузы
      audioBtnPlay.classList.toggle('fa-pause');

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      const track = playlist[trackIndex];
      audioHeader.textContent = track.toUpperCase();
    }

    if (target.classList.contains('audio-button__prev')) {
      prevTrack();
    }

    if (target.classList.contains('audio-button__next')) {
      nextTrack();
    }
  });

  audioPlayer.addEventListener('ended', () => {
    nextTrack();//загрузка трека, а не воспроизведение
    audioPlayer.play();//так как стояло на паузе
  });

  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + '%';//отображаем сколько времени прошло с начала трека (у audioProgressTiming увеличивается ширина от 0 до 100%)

    let minutesPassed = Math.floor(currentTime / 60) || '0'; //получаем количество минут, которые прошли
    let secondsPassed = Math.floor(currentTime % 60) || '0'; //получаем количество секунд, получив остаток от деления на 60, которые прошли

    let minutesTotal = Math.floor(duration / 60) || '0'; //получаем сколько всего минут
    let secondsTotal = Math.floor(duration / 60) || '0'; //получаем сколько всего секунд

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  });

  audioProgress.addEventListener('click', event => {//определяем куда мы кликнули, для этого получаем координаты, это есть только у event
    const x = event.offsetX;//получаем координаты клика
    const allWidth = audioProgress.clientWidth; //получаем длину прогрессбара
    const progress = (x / allWidth) * audioPlayer.duration;

    audioPlayer.currentTime = progress;
  });
};