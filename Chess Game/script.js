const board = document.getElementById("board");
const turnText = document.getElementById("turn");

let selectedSquare = null;
let turn = "white";

// Unicode chess pieces
const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

// Initial board state
let gameBoard = [
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["P","P","P","P","P","P","P","P"],
  ["R","N","B","Q","K","B","N","R"]
];

function drawBoard() {
  board.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");

      const isWhite = (row + col) % 2 === 0;
      square.classList.add(isWhite ? "white" : "black");

      square.dataset.row = row;
      square.dataset.col = col;

      const piece = gameBoard[row][col];
      if (piece) square.textContent = pieces[piece];

      square.addEventListener("click", () => handleClick(square));
      board.appendChild(square);
    }
  }
}

function handleClick(square) {
  const row = square.dataset.row;
  const col = square.dataset.col;
  const piece = gameBoard[row][col];

  if (selectedSquare) {
    movePiece(selectedSquare, square);
    selectedSquare.classList.remove("selected");
    selectedSquare = null;
  } else if (piece && isCorrectTurn(piece)) {
    selectedSquare = square;
    square.classList.add("selected");
  }
}

function isCorrectTurn(piece) {
  return (turn === "white" && piece === piece.toUpperCase()) ||
         (turn === "black" && piece === piece.toLowerCase());
}

function movePiece(from, to) {
  const fr = from.dataset.row;
  const fc = from.dataset.col;
  const tr = to.dataset.row;
  const tc = to.dataset.col;

  gameBoard[tr][tc] = gameBoard[fr][fc];
  gameBoard[fr][fc] = "";

  turn = turn === "white" ? "black" : "white";
  turnText.textContent = `Turn: ${turn.charAt(0).toUpperCase() + turn.slice(1)}`;

  drawBoard();
}

drawBoard();
