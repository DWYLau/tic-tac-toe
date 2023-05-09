// factory function

const Player = function (mark) {
  return { mark };
};

// module

const gameboard = (() => {
  let board = Array.from(document.querySelectorAll(".box"));
  console.log(board);
  let gameState = ["X", "", "", "", "", "", "", "", ""];
  const playerOne = Player("X");
  const playerTwo = Player("O");
  let currentPlayer = playerOne;

  function drawMark() {
    board.forEach((box) => box.addEventListener("click", clickedBox));
  }

  function clickedBox(event) {
    console.log(event.target);
    const index = event.target.getAttribute("data-index");
    console.log(index);
  }

  function populateBoard() {
    board = gameState;
    console.log(board);
  }

  drawMark();
  populateBoard();

  return {
    playerOne,
    playerTwo,
  };
})();
