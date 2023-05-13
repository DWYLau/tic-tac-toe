// factory function

const Player = function (mark) {
  return { mark };
};

// module

const gameboard = (() => {
  const board = Array.from(document.querySelectorAll(".box"));
  let gameState = ["", "", "", "", "", "", "", "", ""];
  const playerOne = Player("X");
  const playerTwo = Player("O");
  let countX = 0;
  let countO = 0;
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
    checkWin(gameState);
  }

  function changePlayer(stateArray) {
    let message = document.querySelector(".player-turn");
    countX = stateArray.filter((mark) => mark === playerOne.mark).length;
    countO = stateArray.filter((mark) => mark === playerTwo.mark).length;
    if (countX > countO) {
      currentPlayer = playerTwo.mark;
      message.textContent = "Player O's turn!";
    } else {
      currentPlayer = playerOne.mark;
      message.textContent = "Player X's turn!";
    }
    return countX, countO;
  }

  function checkWin(gameStateArray) {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winCombos) {
      let [a, b, c] = combo;

      if (
        gameStateArray[a] &&
        gameStateArray[a] == gameStateArray[b] &&
        gameStateArray[b] == gameStateArray[c]
      ) {
        winloseMessage();
      } else {
        tieMessage();
      }
    }
  }

  function winloseMessage() {
    let afterMessage = document.querySelector(".display-message");
    let winningMessage = document.querySelector(".winning-message");
    if (countX > countO) {
      afterMessage.classList.add("show-message");
    } else {
      afterMessage.classList.add("show-message");
      winningMessage.textContent = "Congratulations! 0 wins!";
    }
  }

  function tieMessage() {
    let afterMessage = document.querySelector(".display-message");
    let winningMessage = document.querySelector(".winning-message");
    if (countX === 5 && countO === 4) {
      afterMessage.classList.add("show-message");
      winningMessage.textContent = "Tie! Play again!";
    }
  }

  function restartGame() {
    let restartBtn = document.querySelector(".restart");
    let afterMessage = document.querySelector(".display-message");
    restartBtn.addEventListener("click", function () {
      gameState = ["", "", "", "", "", "", "", "", ""];
      countX = 0;
      countO = 0;
      currentPlayer = playerOne.mark;
      afterMessage.classList.remove("show-message");
      removeMark();
    });
  }

  function removeMark() {
    board.forEach((box) => {
      box.innerHTML = "";
    });
  }
  drawMark();
  restartGame();
})();
