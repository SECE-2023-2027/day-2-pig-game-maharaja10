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

let scorePlayer1, scorePlayer2, currentScore, activePlayer, playing;

const init = function () {
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  currentScore = 0;
  activePlayer = 1; 
  playing = true;

  score1El.textContent = '0';
  score2El.textContent = '0';
  current1El.textContent = '0';
  current2El.textContent = '0';

  diceEl.style.display = 'none';

  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
  switch (activePlayer) {
    case 1:
      current1El.textContent = '0';
      activePlayer = 2;
      break;
    case 2:
      current2El.textContent = '0';
      activePlayer = 1;
      break;
  }
  currentScore = 0;

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
      switch (activePlayer) {
        case 1:
          current1El.textContent = currentScore;
          break;
        case 2:
          current2El.textContent = currentScore;
          break;
      }
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    switch (activePlayer) {
      case 1:
        scorePlayer1 += currentScore;
        score1El.textContent = scorePlayer1;
        if (scorePlayer1 >= 20) {
          playing = false;
          diceEl.style.display = 'none';
          player1El.classList.add('player--winner');
          player1El.classList.remove('player--active');
        } else {
          switchPlayer();
        }
        break;
      case 2:
        scorePlayer2 += currentScore;
        score2El.textContent = scorePlayer2;
        if (scorePlayer2 >= 20) {
          playing = false;
          diceEl.style.display = 'none';
          player2El.classList.add('player--winner');
          player2El.classList.remove('player--active');
        } else {
          switchPlayer();
        }
        break;
    }
  }
});

btnNew.addEventListener('click', init);
