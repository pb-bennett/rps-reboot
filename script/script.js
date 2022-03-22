'use strict';
//////////////////////////////
// DECLARING ELEMENTS
//////////////////////////////
// Nav&Restart
const rulesBtnEl = document.querySelector('.nav-btn--1');
const resetBtnEl = document.querySelector('.nav-btn--2');
const restartBtnEl = document.querySelector('.game-over-restart');
// Title
const titleRockImgEl = document.querySelector('.title-image--01');
const titlePaperImgEl = document.querySelector('.title-image--02');
const titleScissorsImgEl = document.querySelector('.title-image--03');
const titleImgAllEl = document.querySelectorAll('.title-image');
// Scores
const playerScoreEl = document.querySelector('.player-score');
const playerScoreContEl = document.querySelector('.player-score-container');
const cpuScoreEl = document.querySelector('.cpu-score');
const cpuScoreContEl = document.querySelector('.cpu-score-container');
// Alternatives
const altTextEl = document.querySelector('.alternatives-instruction-text');
const altRockImgEl = document.querySelector('.alt-img-rock');
const altPaperImgEl = document.querySelector('.alt-img-paper');
const altScissorsImgEl = document.querySelector('.alt-img-scissors');
const altImgAllEl = document.querySelectorAll('.alternatives-img');
const altContainerEl = document.querySelector('.alternatives-container');
const altImageContainerEl = document.querySelector(
  '.alternatives-img-container'
);
const gameOverTextEl = document.querySelectorAll('.game-over');

// Current Round
const currentBarEl = document.querySelector('.current-bar');
const playerMoveImgEl = document.querySelector('.player-current-move-img');
const cpuMoveImgEl = document.querySelector('.cpu-current-move-img');
const currentTextContEl = document.querySelector('.current-text-container');
const roundNumberEl = document.querySelector('.round-number');
const playerMoveTextEl = document.querySelector('.player-move-text');
const cpuMoveTextEl = document.querySelector('.cpu-move-text');
const currentResultTextEl = document.querySelector('.current-move-result-text');
// History
const historyBarEl = document.querySelector('.history-bar');
const historyContainerEl = document.querySelector('.history-container');
//
//
//

////////////////////////////////////
// Object
////////////////////////////////////
const rps = {
  alt: ['rock', 'paper', 'scissors'],
  outcomes: ['win', 'lose', 'draw'],
  currentPlayerScore: 0,
  currentCpuScore: 0,
  roundNumber: 0,
  gameOverResult: undefined,
  arrs: {
    playerMoves: [],
    cpuMoves: [],
    winLoseDraw: [],
    playerScore: [],
    cpuScore: [],
  },
  /////////////////////////////////////////////
  // Functions
  // Resets the game state
  resetGame() {
    this.arrs.playerMoves = [];
    this.arrs.cpuMoves = [];
    this.arrs.winLoseDraw = [];
    this.arrs.playerScore = [];
    this.arrs.cpuScore = [];
    this.currentPlayerScore = this.currentCpuScore = this.roundNumber = 0;
    this.gameOverResult = undefined;
    historyBarEl.classList.add('hidden');
    currentBarEl.classList.add('hidden');
    gameOverTextEl.forEach(el => el.classList.add('hidden'));
    altTextEl.classList.remove('hidden-opacity');
    altImgAllEl.forEach(el => el.classList.remove('hidden'));
    this.updateUI();
  },
  //receives the player move from the click event listeners and generates random cpu move before starting winner check
  playRound(playerMove) {
    this.arrs.playerMoves.push(playerMove);
    this.arrs.cpuMoves.push(this.alt[Math.trunc(Math.random() * 3)]);
    this.roundNumber++;
    this.checkWinner();
  },
  // Function to compare the moves of the player and the CPU and declare the winner
  checkWinner() {
    const i = this.arrs.playerMoves.length - 1;
    const pM = this.arrs.playerMoves[i];
    const cM = this.arrs.cpuMoves[i];
    if (pM === 'rock') {
      if (cM === 'rock') {
        this.arrs.winLoseDraw.push('draw');
      } else if (cM === 'paper') {
        this.arrs.winLoseDraw.push('lost');
      } else {
        this.arrs.winLoseDraw.push('won');
      }
    } else if (pM === 'paper') {
      if (cM === 'rock') {
        this.arrs.winLoseDraw.push('won');
      } else if (cM === 'paper') {
        this.arrs.winLoseDraw.push('draw');
      } else {
        this.arrs.winLoseDraw.push('lost');
      }
    } else {
      if (cM === 'rock') {
        this.arrs.winLoseDraw.push('lost');
      } else if (cM === 'paper') {
        this.arrs.winLoseDraw.push('won');
      } else {
        this.arrs.winLoseDraw.push('draw');
      }
    }
    //Updates current score variables
    if (this.arrs.winLoseDraw[i] === 'won') {
      this.currentPlayerScore++;
    } else if (this.arrs.winLoseDraw[i] === 'lost') {
      this.currentCpuScore++;
    }
    // stores current score at this round for display in the history section
    this.arrs.playerScore.push(this.currentPlayerScore);
    this.arrs.cpuScore.push(this.currentCpuScore);
    this.updateUI();
  },
  //Check if game is over - first to reach 5 points
  checkGameOver() {
    if (this.currentPlayerScore > 4) {
      this.gameOverResult = 'win';
      return true;
    } else if (this.currentCpuScore > 4) {
      this.gameOverResult = 'lose';
      return true;
    } else {
      return false;
    }
  },
  //  Updates the UI dependent on if game is over
  updateUI() {
    playerScoreEl.textContent = this.currentPlayerScore;
    cpuScoreEl.textContent = this.currentCpuScore;
    const i = this.roundNumber - 1;

    currentBarEl.classList.remove(
      'current-container-border-draw',
      'current-container-border-won',
      'current-container-border-lose'
    );
    currentBarEl.classList.add(
      `current-container-border-${this.arrs.winLoseDraw[i]}`
    );
    if (this.checkGameOver()) {
      gameOverTextEl.forEach(el => el.classList.remove('hidden'));
      altTextEl.classList.add('hidden-opacity');
      altImgAllEl.forEach(el => el.classList.add('hidden'));

      currentResultTextEl.textContent = `You ${this.gameOverResult} this round, and you ${this.gameOverResult} the match!`;
    } else {
      currentResultTextEl.textContent = `You ${
        this.arrs.winLoseDraw[i] || 'draw'
      } this round!`;
    }
    roundNumberEl.textContent = `Round ${this.roundNumber}`;
    playerMoveTextEl.textContent = `You picked ${
      this.arrs.playerMoves[i] || 'rock'
    }`;
    cpuMoveTextEl.textContent = `CPU picked ${this.arrs.cpuMoves[i] || 'rock'}`;
    playerMoveImgEl.src = `./image/color-${
      this.arrs.playerMoves[i] || 'rock'
    }.svg`;
    cpuMoveImgEl.src = `./image/color-${this.arrs.cpuMoves[i] || 'rock'}.svg`;
    if (this.roundNumber > 0) {
      currentBarEl.classList.remove('hidden');

      this.updateHistory();
    }
  },
  // Adds history elements to keep a record of each round of the game
  updateHistory() {
    historyContainerEl.innerHTML = '';
    if (this.roundNumber > 1) {
      for (let i = 0; i < this.arrs.winLoseDraw.length - 1; i++) {
        const html = `<div class="history-row history-row-border-${
          this.arrs.winLoseDraw[i]
        }">
        <img
          src="./image/grey-${this.arrs.playerMoves[i]}.svg"
          class="history-player-move-01 history-img"
        />
        <div class="history-text-01 history-text">
          Round ${i + 1} - You picked ${
          this.arrs.playerMoves[i]
        } and CPU picked ${this.arrs.cpuMoves[i]}.<br />You ${
          this.arrs.winLoseDraw[i]
        } the round. Score: You:${this.arrs.playerScore[i]} - CPU:${
          this.arrs.cpuScore[i]
        }
        </div>
        <img
          src="./image/grey-${this.arrs.cpuMoves[i]}.svg"
          class="history-cpu-move-01 history-img"
        />
      </div>`;
        historyContainerEl.insertAdjacentHTML('afterbegin', html);
        historyBarEl.classList.remove('hidden');
      }
    }
  },
  mouseOverColors(target1, target2) {
    altImgAllEl.forEach(el => {
      el.src = `./image/grey-${el.dataset.move}.svg`;
    });
    titleImgAllEl.forEach(el => {
      el.src = `./image/${el.dataset.move}-title-grey.svg`;
    });
    target1.src = `./image/color-${target1.dataset.move}.svg`;
    target2.src = `./image/${target2.dataset.move}-title-color.svg`;
  },
  mouseOut() {
    altImgAllEl.forEach(el => {
      el.src = `./image/color-${el.dataset.move}.svg`;
    });
    titleImgAllEl.forEach(el => {
      el.src = `./image/${el.dataset.move}-title-color.svg`;
    });
  },
};

////////////////
//Event Listeners // Reset/Restart buttons
resetBtnEl.addEventListener('mousedown', rps.resetGame.bind(rps));
restartBtnEl.addEventListener('mousedown', rps.resetGame.bind(rps));
///////////////////// Rock button
altRockImgEl.addEventListener('mousedown', rps.playRound.bind(rps, 'rock'));
altRockImgEl.addEventListener(
  'mouseover',
  rps.mouseOverColors.bind(rps, altRockImgEl, titleRockImgEl)
);
altRockImgEl.addEventListener('mouseout', rps.mouseOut.bind(rps));
///////////////////// Paper button
altPaperImgEl.addEventListener('mousedown', rps.playRound.bind(rps, 'paper'));
altPaperImgEl.addEventListener(
  'mouseover',
  rps.mouseOverColors.bind(rps, altPaperImgEl, titlePaperImgEl)
);
altPaperImgEl.addEventListener('mouseout', rps.mouseOut.bind(rps));
///////////////////// Scissors button
altScissorsImgEl.addEventListener(
  'mousedown',
  rps.playRound.bind(rps, 'scissors')
);
altScissorsImgEl.addEventListener(
  'mouseover',
  rps.mouseOverColors.bind(rps, altScissorsImgEl, titleScissorsImgEl)
);
altScissorsImgEl.addEventListener('mouseout', rps.mouseOut.bind(rps));

// Initial reset of game state
rps.resetGame();
