// Constants
const container = document.querySelector('.container');
const startBtn = document.getElementById("start");
const playBtn = document.querySelectorAll("#start-game");
const volumeBtn = document.getElementById("volume");
const home = document.getElementById("intro");
const prolog = document.getElementById("prolog");
const healthBar = document.getElementById("health")
const loseDialog = document.getElementById("dialog");
const dialog = document.getElementById("dialog");
const game = document.getElementById("game");
const lose = document.getElementById("lose");
const win = document.getElementById("win");
const miss = document.getElementById("miss");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
  // Audios
  const music = document.getElementById('music');
  const prolog_music = document.getElementById('prolog_music');
  const save = document.getElementById('save');
  const game_over = document.getElementById('game_over');
  const gameOver = document.getElementById('game-over');
  const damageTaken = document.getElementById('damage-taken');
  const hit = document.getElementById('hit');
  const heh = document.getElementById('sans-voice');



// Variables
let musicOn = false;
var player, sans = 'r', life = maxHealth, maxHealth = 92, choices = ['r', 'p', 's'], dmg = 0, sans_life = 10006;
music.volume = 0.4, heh.volume = 0.4, save.volume = 0.4, damageTaken.volume = 0.4, hit.volume = 0.4, prolog_music.volume = 0.4;
game_over.volume = 0.1;

let txt = `You are Arch, You have been watching anime in your entire life.
One day, Sans decided to imprison your waifus in a place far far away for obvious reasons.
What do you do?
`;

let txt2 = `You can do this onii-chan, we belive in you! 👧🏼👧🏻👧🏽`

// Prologue script
let i = 0;
let j = 0;
let speed = 50;
function typeWriter() {
  if (i < txt.length) {
    dialog.textContent += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
function typeWriter2() {
  if (j < txt2.length) {
    loseDialog.textContent += txt2.charAt(i);
    j++;
    setTimeout(typeWriter, speed);
  }
}


// Game script
document.querySelectorAll('.atk').forEach(opt => {
  opt.addEventListener('click', gameLogic)
})

function sansMotive(lol) {
  let random = Math.floor(Math.random() * lol.length);
  dmg = Math.floor(life/3 + (Math.random() * (life - life/3))); // dmg formula
  sans = lol[random];
}

rock.onclick = () => player = 'r';
paper.onclick = () => player = 'p';
scissors.onclick = () => player = 's';

function gameLogic() {
  if(player === 'r' && sans === 's' || player === 'p' && sans === 'r' || player === 's' && sans === 'p') {
    sansMotive(choices);
    dodgejs.play();
    missjs.play();
    heh.play();
    life = 92;
    healthBar.value = 92;
    sans_life -= 1;
  } else {
    damageTaken.play();
    life -= dmg;
    healthBar.value -= dmg;
  }

  if(life <= 0){
    game.style.display = "none";
    lose.style.display = "block";
    typeWriter2(txt2);
    music.pause();
    gameOver.play();
    game_over.play();
  }

  if(sans_life < 10000){
    game.style.display = "none";
    win.style.display = "block";
  }
} 

startBtn.addEventListener("click", () => {
  prolog_music.play();
  home.style.display = "none";
  prolog.style.display = "block";
  typeWriter(dialog);
  yoinkjs.play();
})

playBtn.forEach(opt => {
  opt.addEventListener("click", () => {
    prolog_music.pause();
    music.play();
    slushjs.play();
    stancejs.play();
    lose.style.display = "none";
    prolog.style.display = "none";
    game.style.display = "block";
    life = 92;
    healthBar.value = 92;
    sans_life = 10006;
  })
})
// anime.js

let slushjs = anime({
  targets: [rock, paper, scissors],
  translateX: '-5%',
  direction: 'alternate',
  duration: 500,
  loop: true,
  easing: 'easeInCubic',
  autoplay: false,
  delay: anime.stagger(100)
})

let stancejs = anime({
  targets: '#sans',
  translateY: ['1%', '-1%'],
  direction: 'alternate',
  duration: 1000,
  loop: true,
  easing: 'easeInCubic',
  autoplay: false
})

let dodgejs = anime({
  targets: '#sans',
  translateX: '-100%',
  direction: 'alternate',
  duration: 1200,
  easing: 'spring(1, 80, 10, 0)',
  autoplay: false
})

let missjs = anime({
  targets: '#miss',
  scale: ['0', '1.05'],
  direction: 'alternate',
  delay: 200,
  duration: 1000,
  easing: 'spring(1, 80, 10, 0)',
  autoplay: false
})

let yoinkjs = anime({
  targets: ['#princess', '#antag'],
  translateX: '400%',
  delay: 9000,
  duration: 9000,
  easing: 'easeInCubic',
  autoplay: false
})

let hpbarjs = anime({
  targets: '.specific-unit-values-demo .el',
  width: '100%', // -> from '28px' to '100%',
  easing: 'easeInOutQuad',
  direction: 'alternate',
  loop: true
});

// Audio script

volumeBtn.addEventListener("click", ()=> {
  if(musicOn == false){
    unmute()
  } else {
    mute()
  }
})

function mute() {
  musicOn = false;
  prolog_music.volume = 0;
  music.volume = 0;
  volumeBtn.textContent = "🔈";
}
function unmute() {
  save.play()
  musicOn = true;
  prolog_music.volume = 0.4;
  music.volume = 0.4;
  volumeBtn.textContent = "🔊";
}