import TicTacToe from './tictactoe.js';

const startTicTacToeBtn = document.getElementById('start-tictactoe');
const resetTicTacToeBtn = document.getElementById('reset-tictactoe');
const restartTicTacToeBtn = document.getElementById('restart-tictactoe');
const quitTicTacToeBtn = document.getElementById('quit-tictactoe');
const boardTable = document.getElementById('game-board');
const audioCtrl = document.getElementById('audioControl');
const ticTacToe = new TicTacToe();

startTicTacToeBtn.addEventListener('click', function () {
  boardTable.classList.remove('inactive');
  resetTicTacToeBtn.classList.remove('inactive');
  quitTicTacToeBtn.classList.remove('inactive');
  audioCtrl.classList.remove('inactive');
  this.classList.add('inactive');
  ticTacToe.start();
});

resetTicTacToeBtn.addEventListener('click', function () {
  ticTacToe.reset();
});

// モーダル内のリスタートボタン
restartTicTacToeBtn.addEventListener('click', function () {
  ticTacToe.restart();
});

quitTicTacToeBtn.addEventListener('click', function () {
  boardTable.classList.add('inactive');
  resetTicTacToeBtn.classList.add('inactive');
  this.classList.add('inactive');
  startTicTacToeBtn.classList.remove('inactive');
  audioCtrl.classList.add('inactive');
  ticTacToe.quit();
});
