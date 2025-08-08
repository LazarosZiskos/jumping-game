const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let gameOver = false;

function jump() {
  if (isJumping || gameOver) return;
  isJumping = true;
  player.classList.add("jump");
  setTimeout(() => {
    player.classList.remove("jump");
    isJumping = false;
  }, 500);
}

function checkCollision() {
  if (gameOver) return;

  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    playerRect.right > obstacleRect.left &&
    playerRect.left < obstacleRect.right &&
    playerRect.bottom > obstacleRect.top
  ) {
    endGame();
  }
}

function endGame() {
  gameOver = true;
  obstacle.style.animationPlayState = "paused";
  setTimeout(() => {
    const playAgain = confirm(
      "Game Over! Final Score: " + score + "\n\nPlay again?"
    );
    if (playAgain) {
      location.reload();
    }
  }, 100);
}

function updateScore() {
  if (!gameOver) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }
}

setInterval(updateScore, 1000);

setInterval(checkCollision, 10);

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});
