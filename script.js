// Constants
const container = document.querySelector('.container');
const playBtn = document.querySelectorAll("#start-game");
const volumeBtn = document.getElementById("volume");
const startBtn = document.getElementById("start");
const healthCount = document.getElementById("health__count")
const healthBar = document.getElementById("health")
const prolog = document.getElementById("prolog");
const dialog = document.getElementById("dialog");
const loseDialog = document.getElementById("lose-dialog");
const home = document.getElementById("intro");
const game = document.getElementById("game");
const miss = document.getElementById("miss");
const lose = document.getElementById("lose");
const win = document.getElementById("win");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
  
// Audios

  const prolog_music = document.getElementById('prolog_music');
  const damageTaken = document.getElementById('damage-taken');
  const game_over = document.getElementById('game_over');
  const gameOver = document.getElementById('game-over');
  const game_win = document.getElementById('game_win');
  const gameWin = document.getElementById('game-win');
  const heh = document.getElementById('sans-voice');
  const music = document.getElementById('music');
  const save = document.getElementById('save');
  const hit = document.getElementById('hit');



// Variables
let musicOn = false;
var player, sans = 'r',sansHeath=10008, sans_life = sansHeath, life = maxHealth, maxHealth = 92, choices = ['r', 'p', 's'], dmg = 0;
music.volume = 0.4, heh.volume = 0.4, save.volume = 0.4, damageTaken.volume = 0.4, hit.volume = 0.4, prolog_music.volume = 0.4;
game_over.volume = 0.1;

let txt = `You are Arch, You have been watching anime in your entire life.
One day, Sans decided to imprison your waifus in a place far far away for obvious reasons.
What do you do?
`;

let txt2 = `You can do this onii-chan, we belive in you! 👧🏼👧🏻👧🏽`

// Prologue script
let i = 0;
let speed = 50;
function typeWriter() {
  if (i < txt.length) {
    dialog.textContent += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
let j = 0;
function typeWriter2() {
  if (j < txt2.length) {
    loseDialog.textContent += txt2.charAt(j);
    j++;
    setTimeout(typeWriter2, speed);
  }
}


// Game script
document.querySelectorAll('.atk').forEach(opt => {
  opt.addEventListener('click', gameLogic)
})

function sansMotive(lol) {
  let random = Math.floor(Math.random() * lol.length);
  dmg = Math.floor(maxHealth/3 + (Math.random() * (maxHealth - maxHealth/3))); // dmg formula
  sans = lol[random];
}

rock.onclick = () => player = 'r';
paper.onclick = () => player = 'p';
scissors.onclick = () => player = 's';

function gameLogic() {
  if(player === 'r' && sans === 's' || player === 'p' && sans === 'r' || player === 's' && sans === 'p') {
    healthCount.textContent = maxHealth;
    healthBar.value = maxHealth;
    sansMotive(choices);
    life = maxHealth;
    sans_life -= 1;
    dodgejs.play();
    missjs.play();

    heh.play();
  } else {
    healthCount.textContent -= dmg;
    healthBar.value -= dmg;
    life -= dmg;
    
    damageTaken.play();
  }

  if(life <= 0){
    game.style.display = "none";
    lose.style.display = "block";
    
    music.pause();
    gameOver.play();
    game_over.play();

    typeWriter2(txt2);
  }

  if(sans_life < 10000){
    game.style.display = "none";
    win.style.display = "block";

    music.pause();
    gameWin.play();
    game_win.play();
  }
} 

startBtn.addEventListener("click", () => {
  prolog.style.display = "block";
  home.style.display = "none";
  typeWriter(dialog);
  yoinkjs.play();

  prolog_music.play();
})

playBtn.forEach(opt => {
  opt.addEventListener("click", () => {
    prolog.style.display = "none";
    game.style.display = "block";
    lose.style.display = "none";
    healthCount.textContent = maxHealth;
    healthBar.value = maxHealth;
    sans_life = sansHeath;
    life = maxHealth;
    stancejs.play();
    slushjs.play();
  
    prolog_music.pause();
    music.play();
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
  volumeBtn.textContent = "🔈";
  prolog_music.volume = 0;
  music.volume = 0;
  musicOn = false;
}
function unmute() {
  volumeBtn.textContent = "🔊";
  prolog_music.volume = 0.4;
  music.volume = 0.4;
  musicOn = true;
 
  save.play()
}