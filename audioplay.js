let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  {
    name: "Врунгель 1",
    artist: "Аудиосказка",
    image: "music/pic01.jpg",
    path: "music/vrungel01.mp3",
  },
  {
    name: "Врунгель 2",
    artist: "Аудиосказка",
    image: "music/pic02.jpg",
    path: "music/vrungel02.mp3",
  },
  {
    name: "Врунгель 3-4",
    artist: "Аудиосказка",
    image: "music/pic03.jpg",
    path: "music/vrungel0304.mp3",
  },
  {
    name: "Врунгель 5",
    artist: "Аудиосказка",
    image: "music/pic04.jpg",
    path: "music/vrungsos.mp3"
  },
  {
    name: "Врунгель 8",
    artist: "Аудиосказка",
    image: "music/pic05.jpg",
    path: "music/vrungel08.mp3",
  },
  {
    name: "Врунгель 13-14",
    artist: "Аудиосказка",
    image: "music/pic06.jpg",
    path: "music/vrungel1314.mp3",
  },
  {
    name: "Врунгель 15",
    artist: "Аудиосказка",
    image: "music/pic07.jpg",
    path: "music/vrungel15.mp3",
  },
  {
    name: "Врунгель 17",
    artist: "Аудиосказка",
    image: "music/pic08.jpg",
    path: "music/vrungel17.mp3",
  },
  {
    name: "Небылицы",
    artist: "Из фильма",
    image: "music/pic09.jpg",
    path: "music/nebelitsi.mp3"
  },
  {
    name: "Всё не так у взрослых",
    artist: "ВИА «Синяя птица»",
    image: "music/pic10.jpg",
    path: "music/kakuvzroslih.mp3",
  },
  {
    name: "Неприятность эту мы переживём",
    artist: "Из мультфильма",
    image: "music/pic11.jpg",
    path: "music/neprper.mp3",
  },
  {
    name: "Живи в волшебном ящичке",
    artist: "Из мультфильма",
    image: "music/pic12.jpg",
    path: "music/volshyashik.mp3",
  },
  {
    name: "В порту",
    artist: "Из мультфильма",
    image: "music/pic13.jpg",
    path: "music/vportu.mp3",
  },
  {
    name: "Волшебник",
    artist: "Из фильма",
    image: "music/pic14.jpg",
    path: "music/volshebnik.mp3",
  },
  {
    name: "Дуэт Пончика и Сиропчика",
    artist: "Из фильма",
    image: "music/pic15.jpg",
    path: "music/ponchsirop.mp3",
  },
  {
    name: "Если с другом вышел в путь",
    artist: "Детский хор",
    image: "music/pic16.jpg",
    path: "music/sdrugom.mp3",
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  var elem = document.getElementById('player');
  elem.style.background = bgColor;
  // Set the background to that color
  // document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "Песня " + (track_index + 1) + " из " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


