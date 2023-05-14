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
  let currentPlayer = playerOne.mark;
  let roundsPlayed = 0;

  function drawMark() {
    board.forEach((box) => {
      box.addEventListener("click", clickedBox);
    });
  }

  function clickedBox(event) {
    let index = event.target.getAttribute("data-index");
    if (gameState[index] === "" && roundsPlayed < 9) {
      gameState[index] = currentPlayer;
      board[index].innerHTML = currentPlayer;
      if (checkWin() == true) {
        roundsPlayed = 10;
        displayController.winMessage(currentPlayer);
      }
    }
    roundsPlayed++;
    changePlayer();
    if (roundsPlayed === 9) {
      displayController.drawMessage();
    }
  }

  function changePlayer() {
    let countX = gameState.filter((mark) => mark === playerOne.mark).length;
    let countO = gameState.filter((mark) => mark === playerTwo.mark).length;
    if (countX > countO) {
      currentPlayer = playerTwo.mark;
      displayController.playerTurn.textContent = "Player O's turn!";
    } else {
      currentPlayer = playerOne.mark;
      displayController.playerTurn.textContent = "Player X's turn!";
    }
  }

  function checkWin() {
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
        gameState[a] &&
        gameState[a] == gameState[b] &&
        gameState[b] == gameState[c]
      ) {
        return true;
      }
    }
    return false;
  }

  function restartGame() {
    let restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", function () {
      gameState = ["", "", "", "", "", "", "", "", ""];
      roundsPlayed = 0;
      currentPlayer = playerOne.mark;
      displayController.removeMessage();
      board.forEach((box) => {
        box.innerHTML = "";
      });
    });
  }

  drawMark();
  restartGame();
})();

// module for messages

const displayController = (() => {
  let afterMessage = document.querySelector(".display-message");
  let winnerMessage = document.querySelector(".winning-message");
  let playerTurn = document.querySelector(".player-turn");

  function winMessage(winner) {
    afterMessage.classList.add("show-message");
    winnerMessage.textContent = `Congratulations! ${winner} has won!`;
  }

  function drawMessage() {
    afterMessage.classList.add("show-message");
    winnerMessage.textContent = "It's a tie! Play again!";
  }

  function removeMessage() {
    afterMessage.classList.remove("show-message");
  }

  return {
    playerTurn,
    winMessage,
    drawMessage,
    removeMessage,
  };
})();
