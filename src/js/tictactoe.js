import Board from './board.js';
import HumanPlayer from './players/human-player.js';

export default class TicTacToe {
  constructor() {
    this.board = null;
  }

  init() {
    // TODO: npcの実装は後から
    this.players = {
      x: new HumanPlayer('x'),
      o: new HumanPlayer('o'),
    };
    // 現在の手番を保持
    this.currentPlayer = this.players.x;
    this.board.init();
  }

  start() {
    this.board = new Board(this);
    this.init();
    this.setCellClickListeners();
    this.displayResults();
  }

  reset() {
    this.init();
    this.clearCellClickListeners();
    this.setCellClickListeners();
  }

  quit() {
    this.board = null;
    this.clearCellClickListeners();
  }

  get() {
    let retString = localStorage.getItem('playResults');
    // ローカルストレージ初回記録時に初期化
    return retString === null ? Array(0) : JSON.parse(retString);
  }

  save(result) {
    let retArray = this.get();
    retArray.push(result);
    localStorage.setItem('playResults', JSON.stringify(retArray));
    this.displayResults();
  }

  // セルをクリックした時のイベントリスナーの登録
  setCellClickListeners() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        cell.addEventListener('click', () => {
          if (!this.board.isGameOver() && this.board.isEmpty(row, col)) {
            this.handleCellClick(row, col);
          }
        });
      }
    }
  }

  // セルをクリックした時のイベントリスナーの削除
  clearCellClickListeners() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        cell.removeEventListener('click', () => {
          if (!this.board.isGameOver() && this.board.isEmpty(row, col)) {
            this.handleCellClick(row, col);
          }
        });
      }
    }
  }

  // セルがクリックされた時の処理
  handleCellClick(row, col) {
    // セルの取得
    const cell = document.getElementById(`cell-${row}-${col}`);

    // すでに埋まっているマスをクリックした場合何もしない
    if (!this.board.isEmpty(row, col)) {
      return;
    }

    // 一手進める（シンボルを置く）
    this.board.placeSymbol(row, col, cell);

    if (this.board.isGameOver()) {
      // 決着がついた場合
      this.winner = this.currentPlayer;
      console.log(`Winner is '${this.winner.symbol}'`);
      this.save(this.winner.symbol);
    } else {
      // 決着がついていない場合
      if (this.board.isBoardFull()) {
        // 引き分けの場合
        console.log('Draw!');
        this.save('Draw');
      } else {
        // 試合続行の場合
        this.switchPlayer();
      }
    }
  }

  // 手番の更新
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.players.x ? this.players.o : this.players.x;
  }

  // 勝敗の表示
  displayResults() {
    const resultsElement = document.getElementById(`results`);
    resultsElement.innerHTML = ``;
    const results = this.get();
    let message = '';
    results.forEach((result) => {
      if (result == 'Draw') {
        message = result;
      } else {
        message = 'Win ' + result;
      }
      resultsElement.innerHTML += `
        <div class="result">${message}</div>
      `;
    });
  }
}
