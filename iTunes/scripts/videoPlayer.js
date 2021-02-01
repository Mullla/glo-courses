//import { addZero } from 'supScript.js';

export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector('.video-player');
  const videoBtnPlay = document.querySelector('.video-button__play');
  const videoBtnStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.video-volume');
  const videoFullscreen = document.querySelector('.video-fullscreen');

  const toggleIcon = () => {
    if(videoPlayer.paused){
      videoBtnPlay.classList.remove('fa-pause');
      videoBtnPlay.classList.add('fa-play');
    } else {
      videoBtnPlay.classList.remove('fa-play');
      videoBtnPlay.classList.add('fa-pause');
    }
  };

  const togglePlay = event => {
    event.preventDefault();
    if(videoPlayer.paused){
      videoPlayer.play(); //метод, который есть у плеера, это встроенное api браузера, т.к. используется тег video
    } else {
      videoPlayer.pause(); //метод, который есть у плеера
    }
    toggleIcon();
  };

  const stopPlay = () => { 
    videoPlayer.pause();
    videoPlayer.currentTime = 0; //ставим начальную позицию видео = 0
    videoBtnPlay.classList.remove('fa-pause');
    videoBtnPlay.classList.add('fa-play');
  };

  const addZero = n => n < 10 ? '0'+ n : n; //функция, которая вставляет 0 перед однозначным числом

  const changeValue = () => {
    const valueVolume = videoVolume.value;
    videoPlayer.volume = valueVolume / 100; //тк значение volume у плеера от 0 до 1
  }

  videoPlayer.addEventListener('click', togglePlay);
  videoBtnPlay.addEventListener('click', togglePlay);

  // можно сделать то же самое, но через событие видео или аудиоплеера
  // videoPlayer.addEventListener('play', toggleIcon);
  // videoBtnPlay.addEventListener('pause', toggleIcon);

  videoBtnStop.addEventListener('click', stopPlay);
  
  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100; //определяем, сколько прошло времени, и ползунок занимает свое положение в зависимости от этого значения

    let minutePassed = Math.floor(currentTime / 60); //получаем количество минут, которые прошли
    let secondsPassed = Math.floor(currentTime % 60); //получаем количество секунд, получив остаток от деления на 60, которые прошли

    let minuteTotal = Math.floor(duration / 60); //получаем сколько всего минут
    let secondsTotal = Math.floor(duration / 60); //получаем сколько всего секунд

    videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
    videoTimeTotal.textContent = addZero(minuteTotal) +  ':' + addZero(secondsTotal);

    // или можно с интерполяцией
    // videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    // videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration; //максимальное время длительности видео
    const value = videoProgress.value; //получаем текущее время в видео

    videoPlayer.currentTime = (value * duration) / 100; //присваиваем новое значение текущего времени, в зависимости от изменения ползунка, на 100, так как это максимальное значение
  });

  videoVolume.addEventListener('input', changeValue); //остается, так как иначе не будет работать изменение звука без полноэкранного режима
  videoPlayer.addEventListener('volumechange', () => { //у плеера есть такое событие при изменении звука
    videoVolume.value = Math.round(videoPlayer.value * 100);
  });
  changeValue(); //специально вызываем эту функцию, чтобы начальное значение было 50%, как мы и установили в html

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen(); //метод, который есть у видео-плеера, встроен в браузер
  });

  videoPlayer.addEventListener('fullscreenchange', () => {
    if (document.fullscreen) {
      videoPlayer.controls = true; //включаем собственные кнопки в плеере в полноэкранном режиме, например в Firefox они выключены по умолчанию
    } else {
      videoPlayer.controls = false;
    }
  });

};