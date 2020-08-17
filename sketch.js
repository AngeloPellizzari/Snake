// Constants and General Stuff
let gameOver = true;
let score;
let canvas_width = 600;
let canvas_height = 600;
let dots_x;
let dots_y;
let dots;
let snakes_x;
let snakes_y;
let size;
let speed_x;
let speed_y;
let lastKey;
let vx;
let vy;
let time;


// Defining the setup function which preps the canvas and runs the initialization function
function setup() {
  createCanvas(canvas_width, canvas_height);
  init();
}

// Defining the init funciton which sets the initial parameters of the game
function init() {
  dots_x = [];
  dots_y = [];
  dots = [0, 0];
  while (dots_x.length < 50) {
    var e = Math.floor(Math.random() * 380 + 10);
    if (dots_x.indexOf(e) === -1) dots_x.push(e);
  }
  while (dots_y.length < 50) {
    var f = Math.floor(Math.random() * 380 + 10);
    if (dots_y.indexOf(f) === -1) dots_y.push(f);
  }
  snakes_x = [100];
  snakes_y = [100];
  size = 5;
  speed_x = [size];
  speed_y = [0];
  vx = size;
  vy = 0;
  score = 0;
}


// Defining the draw function. This funciton will continually loop overitself and never stops running until you end the program
function draw() {
  background(220);
  if (gameOver) {
    text("Game Over", 162, 175);
    text("Press r to restart", 150, 200);
    if (keyIsPressed) {
      if (key == 'r') {
        init();
        gameOver = false;
      }
    }
  } else {
    time = 0;
    dots[0] = dots_x[score];
    dots[1] = dots_y[score];
    text("Score: " + score, 0, 10);
    fill('red');
    rect(dots_x[score], dots_y[score], size, size);
    for (var s in snakes_x) {
      fill('green');
      rect(snakes_x[s], snakes_y[s], size, size);
      fill(0);
      snakes_x[s] += speed_x[s];
      snakes_y[s] += speed_y[s];
    }
    speed_x.unshift(vx);
    speed_y.unshift(vy);
    if (keyIsPressed) {
      if (key == 'w') {
        vx = 0;
        vy = -1 * size;
      } else if (key == 'a') {
        vx = -1 * size;
        vy = 0;
      } else if (key == 's') {
        vx = 0;
        vy = size;
      } else if (key == 'd') {
        vx = size;
        vy = 0
      }
    }
    if (snakes_x[0] == 0 || snakes_x[0] == canvas_width - size || snakes_y[0] == 0 || snakes_y[0] == canvas_height - size) {
      gameOver = true;
    }
    for (var t in snakes_x) {
      if (t != 0) {
        if (snakes_x[t] == snakes_x[0] && snakes_y[t] == snakes_y[0]) {
          gameOver = true;
        }
      }
    }
    if (abs(snakes_x[0] - dots[0]) <= 10 && abs(snakes_y[0] - dots[1]) <= 10) {
      score += 1;
      dots = [-1, -1]
      snakes_x.push(snakes_x[snakes_x.length - 1] - speed_x[snakes_x.length - 1])
      snakes_y.push(snakes_y[snakes_y.length - 1] - speed_y[snakes_y.length - 1])
    }
    while(time < 10000000){
      time += 1;
    }
  }
}