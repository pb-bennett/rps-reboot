'use strict';
//////////////////////////////
// DECLARING ELEMENTS
//////////////////////////////
// Nav
const rulesBtnEl = document.querySelector('.nav-btn--1');
const resetBtnEl = document.querySelector('.nav-btn--2');
// Title
const titleRockImgEl = document.querySelector('.title-image--01');
const titlePaperImgEl = document.querySelector('.title-image--02');
const titleScissorsImgEl = document.querySelector('.title-image--03');
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
  // currentMoves: ['scissors', 'paper'],
  alt: ['rock', 'paper', 'scissors'],
  outcomes: ['win', 'lose', 'draw'],
  currentPlayerScore: 0,
  currentCpuScore: 0,
  roundNumber: 0,
  playerMoves: [],
  cpuMoves: [],
  winLoseDraw: [],
  playerScore: [],
  cpuScore: [],
  /////////////////////////////////////////////
  // Functions
  resetGame() {
    this.playerMoves = [];
    this.cpuMoves = [];
    this.winLoseDraw = [];
    this.playerScore = [];
    this.cpuScore = [];

    this.currentPlayerScore = this.currentCpuScore = this.roundNumber = 0;
    historyBarEl.classList.add('hidden');
    currentBarEl.classList.add('hidden');
  },
  playRound(playerMove) {
    this.playerMoves.push(playerMove);
    this.cpuMoves.push(this.alt[Math.trunc(Math.random() * 3)]);
    this.roundNumber++;
    // console.log(this.roundNumber);
    this.checkWinner();
    // console.log(this.playerMoves.slice(-1), this.cpuMoves.slice(-1));
  },
  checkWinner() {
    const i = this.playerMoves.length - 1;
    const pM = this.playerMoves[i];
    const cM = this.cpuMoves[i];
    console.log(pM, cM);
    if (pM === 'rock') {
      if (cM === 'rock') {
        this.winLoseDraw.push('draw');
      } else if (cM === 'paper') {
        this.winLoseDraw.push('lose');
      } else {
        this.winLoseDraw.push('win');
      }
    } else if (pM === 'paper') {
      if (cM === 'rock') {
        this.winLoseDraw.push('win');
      } else if (cM === 'paper') {
        this.winLoseDraw.push('draw');
      } else {
        this.winLoseDraw.push('lose');
      }
    } else {
      if (cM === 'rock') {
        this.winLoseDraw.push('lose');
      } else if (cM === 'paper') {
        this.winLoseDraw.push('win');
      } else {
        this.winLoseDraw.push('draw');
      }
    }
    if (this.winLoseDraw[i] === 'win') {
      this.currentPlayerScore++;
    } else if (this.winLoseDraw[i] === 'lose') {
      this.currentCpuScore++;
    }
    this.playerScore.push(this.currentPlayerScore);
    this.cpuScore.push(this.currentCpuScore);
    this.updateUI();
    // console.log(this.winLoseDraw[i]);
  },
  updateUI() {},
};

// rps.cpuMove();
// rps.cpuMove();
// rps.cpuMove();
// rps.cpuMove();

// console.log(rps.cpuMoves);
// rps.resetGame();
// console.log(rps.cpuMoves);
// rps.resetGame();
rps.playRound('rock');
rps.playRound('paper');
rps.playRound('rock');
rps.playRound('rock');
rps.playRound('rock');
rps.playRound('rock');
rps.playRound('rock');
// rps.checkWinner();
rps.playRound('paper');
// // rps.checkWinner();
rps.playRound('scissors');
// // rps.checkWinner();
rps.playRound('scissors');
console.log(rps.winLoseDraw);
console.log(rps.playerScore, rps.currentPlayerScore);
console.log(rps.cpuScore, rps.currentCpuScore);
// rps.resetGame();
console.log(rps.winLoseDraw);
console.log(rps.playerScore, rps.currentPlayerScore);
console.log(rps.cpuScore, rps.currentCpuScore);

// rps.playRound('frog');
// rps.resetGame();
// rps.checkWinner();
// console.log(rps.playerMoves, rps.cpuMoves);
// historyBarEl.classList.add('hidden');
// currentBarEl.classList.add('hidden');
// altContainerEl.classList.add('hidden-opacity');
// altImgAllEl.forEach(el => el.classList.add('hidden'));
// altImgAllEl.classList.add('hidden');
