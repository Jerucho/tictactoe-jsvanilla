const app = document.getElementById("app");
const board = document.getElementById("board");
const btnReset = document.getElementById("btnReset");
const currentPlayerDisplay = document.getElementById("currentPlayer");
let currentPlayer = 1;
currentPlayerDisplay.innerHTML = currentPlayer === 2 ? "PC" : "Player";

const statusDisplay = document.getElementById("status");

let boardPositions = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const renderBoard = () => {
  board.innerHTML = "";
  boardPositions.forEach((row, rowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    row.forEach((cell, cellIndex) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.dataset.row = rowIndex;
      cellElement.dataset.cell = cellIndex;
      cellElement.innerHTML = cell === 1 ? "X" : cell === 2 ? "O" : "";

      // Asignar clic solo si la celda está vacía
      cellElement.addEventListener("click", () => {
        if (currentPlayer === 1 && boardPositions[rowIndex][cellIndex] === 0) {
          assignValueToCell(rowIndex, cellIndex, currentPlayer);
        }
      });

      rowElement.appendChild(cellElement);
    });
    board.appendChild(rowElement);
  });
};

const assignValueToCell = (row, cell, value) => {
  statusDisplay.innerHTML = "";
  if (boardPositions[row][cell] !== 0) return;

  boardPositions[row][cell] = value;
  renderBoard();

  const isGameOver = checkWinner();
  if (!isGameOver) {
    endPlayerTurn();
  }
};

const endPlayerTurn = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  currentPlayerDisplay.innerHTML = currentPlayer === 2 ? "PC" : "Player";

  if (currentPlayer === 2) {
    setTimeout(() => {
      pcMove();
    }, 500); // Retraso para el movimiento del PC
  }
};

const checkWinner = () => {
  let winner = 0;

  // Verificar filas
  boardPositions.forEach((row) => {
    if (row[0] === row[1] && row[0] === row[2] && row[0] !== 0) {
      winner = row[0];
    }
  });

  // Verificar columnas
  for (let i = 0; i < 3; i++) {
    if (
      boardPositions[0][i] === boardPositions[1][i] &&
      boardPositions[0][i] === boardPositions[2][i] &&
      boardPositions[0][i] !== 0
    ) {
      winner = boardPositions[0][i];
    }
  }

  // Verificar diagonales
  if (
    boardPositions[0][0] === boardPositions[1][1] &&
    boardPositions[0][0] === boardPositions[2][2] &&
    boardPositions[0][0] !== 0
  ) {
    winner = boardPositions[0][0];
  }

  if (
    boardPositions[0][2] === boardPositions[1][1] &&
    boardPositions[0][2] === boardPositions[2][0] &&
    boardPositions[0][2] !== 0
  ) {
    winner = boardPositions[0][2];
  }

  if (winner !== 0) {
    setTimeout(() => {
      statusDisplay.innerHTML = winner === 1 ? "Player wins!" : "PC wins!";
      gameOver();
    }, 500);
    return true;
  }

  // Verificar empate
  const isDraw = boardPositions.flat().every((cell) => cell !== 0);
  if (isDraw) {
    setTimeout(() => {
      statusDisplay.innerHTML = "It's a draw!";
      gameOver();
    }, 500);
    return true;
  }

  return false;
};

const gameOver = () => {
  boardPositions = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  currentPlayer = 1;

  currentPlayerDisplay.innerHTML = currentPlayer === 2 ? "PC" : "Player";
  renderBoard();
};

btnReset.addEventListener("click", () => {
  gameOver();
});

const pcMove = () => {
  let moved = false;

  while (!moved) {
    const row = Math.floor(Math.random() * 3);
    const cell = Math.floor(Math.random() * 3);

    if (boardPositions[row][cell] === 0) {
      boardPositions[row][cell] = 2;
      moved = true;
    }
  }

  renderBoard();
  const isGameOver = checkWinner();
  if (!isGameOver) {
    endPlayerTurn();
  }
};

window.onload = () => {
  renderBoard();
};
