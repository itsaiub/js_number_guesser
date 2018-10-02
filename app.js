/* jshint esversion:6 */

// Game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', (e) => {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

const checkFunc = () => {
  let guess = parseInt(guessInput.value);

  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please, guess number between ${min} to ${max}`, 'red');
  } else if(guess > min || guess < max) {
    if(guess === winningNum) {
      gameOver(true, `${winningNum} is correct, You Win!`);
    } else {
      if(guessesLeft > 0) {
        guessesLeft -= 1;
      }
      guessInput.value = '';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  } 

  if(guessesLeft === 0) {
    gameOver(false, `Game Over, you lost. The correct number is ${winningNum}.`);
  }
};

guessBtn.addEventListener('click', checkFunc);

// Game Over
const gameOver = (won, msg) => {
  let color = (won === true) ? 'green' : 'red'; 
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set Message
  setMessage(msg, color);
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
};

// Set Message
const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
};

function getRandomNum(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(num);
  return num;
}
