'use strict';
const player1El = document.querySelector('.player-1');
const player2El = document.querySelector('.player-2');
const score1El = player1El.querySelector('.score');
const score2El = player2El.querySelector('.score');
const current1El = player1El.querySelector('.current-score');
const current2El = player2El.querySelector('.current-score');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.new-game');
const btnRoll = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; 
  playing = true;

  score1El.textContent = '0';
  score2El.textContent = '0';
  current1El.textContent = '0';
  current2El.textContent = '0';

  diceEl.style.display = 'none';
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.querySelectorAll('.current-score')[activePlayer].textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {

    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.style.display = 'block';
    diceEl.src = `dice/dice${dice}.jpg`;


    if (dice !== 1) {
      currentScore += dice;
      document.querySelectorAll('.current-score')[activePlayer].textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelectorAll('.score')[activePlayer].textContent = scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.style.display = 'none';
      document.querySelectorAll('.player')[activePlayer].classList.add('player--winner');
      document.querySelectorAll('.player')[activePlayer].classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
