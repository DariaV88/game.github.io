const dragon = document.querySelector('.dragon');
const game = document.querySelector('.game');
const scoreText = document.querySelector('.score');
const playBtn = document.querySelector('.play');
const restartBtn = document.querySelector('.restart');
// const ratingBtn = document.querySelector('.rating-btn');
// const ratingList = document.querySelector('.rating');
const modalPlay = document.querySelector('.modal-play');
const modalEnd = document.querySelector('.modal-end');
const modalBlockRating = document.querySelector('.rating');
const modalBlockEnd = document.querySelector('.end');
const endScore = document.querySelector('.end-score');
const obstaclesDiv = document.querySelector('.obstacles');
const input = document.querySelector('.input');
const soundDie = new Audio('assets/sounds/die.mp3');
const soundClick = new Audio('assets/sounds/click.mp3');
const soundScores = new Audio('assets/sounds/scores.mp3');

const speed = 2;
let isGameStart = false;
let dragonPosition;
let dragonBottom = 400;
let score = 0;
username = '';

playBtn.addEventListener('click', () => {
  soundClick.play();
  start();
});

function start() {
  username = input.value;
  score = 0;
  isGameStart = true;
  modalPlay.style.display = 'none';
  generateObstacle();
}

function changePosition() {
  if (isGameStart) {
    dragon.style.bottom = dragonBottom - speed + 'px';
    dragonBottom -= speed;
  }
}
let int1 = setInterval(changePosition, 20);

function jump() {
  dragonPosition = dragonBottom;
  dragon.style.bottom = dragonBottom + 30 + 'px';
  dragonBottom += 30;
  dragon.src = './assets/dragon-2.png';
}

document.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowUp' && isGameStart) jump();
});

document.addEventListener('keyup', () => {
  dragon.src = './assets/dragon-1.png';
});

function generateObstacle() {
  let random2 = Math.random() * 250 + 10;
  let obstacleLeft = 1200;

  let obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = obstacleLeft + 'px';
  obstacle.style.bottom = -random2 + 'px';
  let obstacleBottom = 300 - random2;
  obstaclesDiv.appendChild(obstacle);

  let topObstacle = document.createElement('div');
  topObstacle.classList.add('topObstacle');
  topObstacle.style.left = obstacleLeft + 'px';
  topObstacle.style.bottom = 300 - random2 + 170 + 'px';
  let topObstacleBottom = 300 - random2 + 170;
  obstaclesDiv.appendChild(topObstacle);

  function func() {
    if (isGameStart) {
      obstacleLeft -= 5;
      obstacle.style.left = obstacleLeft + 'px';
      topObstacle.style.left = obstacleLeft + 'px';

      if (obstacleLeft == 0) {
        game.removeChild(obstacle);
        game.removeChild(topObstacle);
      }

      if (obstacleLeft == 380 && isGameStart) {
        soundScores.play();
        score++;
        scoreText.textContent = score;
      }

      // 520 = 400 dragon left + 120 dragon width
      if (
        (obstacleLeft <= 520 && obstacleLeft >= 425 && dragonBottom < obstacleBottom) ||
        (obstacleLeft <= 520 && obstacleLeft >= 425 && dragonBottom > topObstacleBottom)
      ) {
        soundDie.play();
        isGameStart = false;
        obstaclesDiv.innerHTML = '';
        modalEnd.style.display = 'flex';
        modalEnd.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        endScore.textContent = score;
        clearInterval(timerId);
        clearInterval(int1);
      }
    }
  }

  let timerId = setInterval(func, 40);
  if (isGameStart) setTimeout(generateObstacle, 2500);
}
