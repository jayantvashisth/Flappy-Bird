console.log("hello world")

const bird = document.querySelector('.bird');
const gameDisplay = document.querySelector('.game-container');
const ground = document.querySelector('.ground-moving');
const game_over = document.querySelector('.game-over');

let birdBottom = 230;
let birdLeft = 220;
let gravity = 2;
let isGameOver = false;
let gap = 430;


function jump() {
    if (birdBottom < 500) {
        birdBottom = birdBottom + 50;
    }
    bird.style.bottom = birdBottom + 'px';
    console.log(birdBottom);



}
function control(e) {
    if (e.keyCode === 38) {
        jump()
    }
}
document.addEventListener('keyup', control);
function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keyup', control);
    console.log('game over mf');
    ground.classList.add('ground');
    ground.classList.remove('ground-moving');
    game_over.style.display = "block";



}

function generateObsactle() {

    const obstacle = document.createElement('div');
    const topObsacle = document.createElement('div');

    let obstacleLeft = 400;
    let randomHeight = Math.random() * 60;

    let obstacleBottom = randomHeight;

    if (!isGameOver) {
        obstacle.classList.add('obstacle');
        topObsacle.classList.add('topObstacle');

    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObsacle);

    obstacle.style.left = obstacleLeft + 'px';
    topObsacle.style.left = obstacleLeft + 'px';

    obstacle.style.bottom = obstacleBottom + 'px';
    topObsacle.style.bottom = obstacleBottom + gap + 'px';

   

    function movingObstacle() {
        obstacleLeft -= 2;
        obstacle.style.left = obstacleLeft + 'px';
        topObsacle.style.left = obstacleLeft + 'px';
        if (obstacleLeft <= -60) {
            clearInterval(timerId);
            gameDisplay.removeChild(obstacle);
            gameDisplay.removeChild(topObsacle);
        }
        if (
            obstacleLeft > 220 && obstacleLeft < 280 && birdLeft === 220 &&
            (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
            birdBottom === 0
        ) {
            gameOver();
            clearInterval(timerId);
            console.log('here is the error');
        }

    }
    
    

    
    let timerId = setInterval(movingObstacle, 20);
    if (!isGameOver) setTimeout(generateObsactle, 3000);

}
generateObsactle();



function startGame() {
    birdBottom = birdBottom - gravity;
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';



}
let gameTimerId = setInterval(startGame, 20);

// clearInterval(timerId)


startGame();