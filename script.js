let bird;
let pipes = [];
let score = 0;
let birdImg, bgImg, pipeImg;

function preload() {
  birdImg = loadImage('https://i.imgur.com/N5uCbDu.png');  // 鳥の画像
  bgImg = loadImage('https://i.imgur.com/v6i6D2s.jpg');   // 背景画像
  pipeImg = loadImage('https://i.imgur.com/IGc1eFq.png'); // パイプ画像
}

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(bgImg);

  bird.update();
  bird.show();

  if (frameCount % 90 === 0) {
    pipes.push(new Pipe());
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].hits(bird)) {
      console.log('Game Over');
      noLoop();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score++;
    }
  }

  fill(255);
  textSize(32);
  text("Score: " + score, 10, 30);
}

function keyPressed() {
  if (key === ' ') {
    bird.flap();
  }
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
  }

  show() {
    image(birdImg, this.x, this.y, 40, 40);
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  flap() {
    this.velocity += this.lift;
  }
}

class Pipe {
  constructor() {
    this.spacing = 120;
    this.top = random(height / 4, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 50;
    this.speed = 2;
  }

  show() {
    image(pipeImg, this.x, 0, this.w, this.top);
    image(pipeImg, this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }
}