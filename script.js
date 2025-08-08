const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let gameOver = false;
let obstaclePassed = false;

function jump() {
  if (isJumping || gameOver) return;
  isJumping = true;
  player.classList.add("jump");
  setTimeout(() => {
    player.classList.remove("jump");
    isJumping = false;
  }, 800);
}

function checkCollisionAndScore() {
  if (gameOver) return;

  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  const horizontalOverlap =
    playerRect.right > obstacleRect.left &&
    playerRect.left < obstacleRect.right;
  const verticalOverlap = playerRect.bottom > obstacleRect.top;

  if (horizontalOverlap && verticalOverlap) {
    endGame();
    return;
  }

  if (!obstaclePassed && obstacleRect.right < playerRect.left) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    obstaclePassed = true;
  }
}

function endGame() {
  if (gameOver) return;
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

obstacle.addEventListener("animationiteration", () => {
  obstaclePassed = false;
});

setInterval(checkCollisionAndScore, 10);

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});
