const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

// general settings
let gamePlaying = false;
const gravity = .5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0, 
    flight, 
    flyHeight, 
    currentScore, 
    pipe;

// pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth));

// draw the bird
const drawBird = () => {
  ctx.drawImage(img, index * size[0], 0, size[0], size[1], cTenth, flyHeight, size[0], size[1]);
}

// draw the pipes
const drawPipes = () => {
  pipe = pipeLoc();
  ctx.drawImage(img, 0, pipe, pipeWidth, pipe + pipeGap, cTenth * 3, 0, pipeWidth, pipe + pipeGap);
  ctx.drawImage(img, 0, pipe + pipeGap, pipeWidth, canvas.height - (pipe + pipeGap), cTenth * 3, pipe + pipeGap, pipeWidth, canvas.height - (pipe + pipeGap));
}

// draw the score
const drawScore = () => {
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "#000";
  ctx.fillText(currentScore, cTenth * 5, 50);
  ctx.fillText(bestScore, cTenth * 5, 30);
}

// update the game
const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipes();
  drawScore();
}
  flyHeight += gravity;
  if (flight) {
    flyHeight += jump;
    flight--;
  }
  if (flyHeight + size[1] > canvas.height || flyHeight < 0) {
    flight = 0;
    if (!gamePlaying) {
      gamePlaying = true;
      currentScore = 0;
    }
  }