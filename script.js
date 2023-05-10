// factory function

const Player = function (mark) {
  return { mark };
};

// module

const gameboard = (() => {
  const board = Array.from(document.querySelectorAll(".box"));
  let gameState = ["", "", "", "", "", "", "", "", ""];
  console.log(gameState);

  const playerOne = Player("X");
  const playerTwo = Player("O");
  let currentPlayer = playerOne.mark;

  function drawMark() {
    board.forEach((box) => {
      box.addEventListener("click", clickedBox);
    });
  }

  function clickedBox(event) {
    let index = event.target.getAttribute("data-index");
    if (gameState[index] === "") {
      gameState[index] = currentPlayer;
      board[index].innerHTML = currentPlayer;
    }
    changePlayer(gameState);
    console.log(board);
    console.log(gameState);
    checkWin(gameState);
  }

  function changePlayer(stateArray) {
    let countX = stateArray.filter((mark) => mark === playerOne.mark).length;
    let countO = stateArray.filter((mark) => mark === playerTwo.mark).length;
    if (countX > countO) {
      currentPlayer = playerTwo.mark;
    } else {
      currentPlayer = playerOne.mark;
    }
  }

  function checkWin(gameStateArray) {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [3, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winCombos.forEach((combo) => {
      console.log(combo);
      console.log(combo[0]);
      console.log(gameStateArray);
    });
  }
  drawMark();
})();
