let level = 1;
const levelElement = document.querySelector('#level-score');
levelElement.innerHTML = `Level ${level}`;

// Array of possible player character
const characters = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];
let characterIndex = 0;

// Array of possible enemies y position
const yArray = [61, 144, 227];

// Enemies our player must avoid
class Enemy {
  constructor() {
    this.sprite = 'images/enemy-bug.png';
    // The speed varies from 40 to 80 multiplied by the level number
    this.speed = Math.floor(Math.random() * 40 + 40) * level;
    this.x = -90;
    this.y = yArray[Math.floor(Math.random() * 3)];
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update = dt => {
    this.x += this.speed * dt;

    // Reset the enemies x position when it reaches the canvas edge
    // Change its y position and speed
    if (this.x > 504) {
      this.speed = Math.floor(Math.random() * 40 + 40) * level;
      this.x = -90;
      this.y = yArray[Math.floor(Math.random() * 3)];
    }

    // Check collision
    if (
      player.x < this.x + 60 &&
      player.x + 37 > this.x &&
      player.y < this.y + 25 &&
      30 + player.y > this.y
    ) {
      player.reset();

      // Reset the level number
      level = 1;
      levelElement.innerHTML = `Level ${level}`;
    }
  };

  // Draw the enemy on the screen, required method for game
  render = () => {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}

class Player {
  constructor() {
    this.sprite = characters[characterIndex];
    this.x = 202;
    this.y = 320;
  }

  update = dt => {};

  render = () => {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  handleInput = pressedKey => {
    switch (pressedKey) {
      case 'right':
        this.x += 101;
        break;
      case 'left':
        this.x -= 101;
        break;
      case 'up':
        this.y -= 83;
        break;
      case 'down':
        this.y += 83;
        break;
      case 'change':
        if (characterIndex === 4) characterIndex = 0;
        else characterIndex++;
        this.sprite = characters[characterIndex];
    }

    // handle the canvas edges
    if (this.x > 404) this.x = 404;
    if (this.x < 0) this.x = 0;

    if (this.y > 403) this.y = 403;
    if (this.y < 0) {
      this.reset();
      if (level === 5) {
        alert('You Won!!');
        level = 1;
      } else {
        level++;
      }
      levelElement.innerHTML = `Level ${level}`;
      resetGame();
    }
  };

  reset = () => {
    this.x = 202;
    this.y = 320;
  };
}

const resetGame = () => {
  allEnemies = [];
  allEnemies.push(new Enemy(), new Enemy(), new Enemy());
  player = new Player();
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    67: 'change'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

let allEnemies;
let player;
resetGame();
