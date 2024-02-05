const ticTacBoard = (function () {
  const gameArray = [null, null, null, null, null, null, null, null, null];

  const getArray = () => gameArray;

  const setArray = (value, idx) => (gameArray[idx] = value);

  return {
    getArray,
    setArray,
  };
})();

const players = function (name, marker, turn) {
  return { name, marker, turn };
};

const gameController = (function () {
  const playerX = players("X", "X", true);
  const playerO = players("O", "O", false);

  function takeTurns(clickedDiv) {
    let divIdx = clickedDiv.getAttribute("data-idx");
    if (playerX.turn) {
      ticTacBoard.setArray(playerX.marker, divIdx);
      playerX.turn = !playerX.turn;
      playerO.turn = !playerO.turn;
      renderingToDOM.updatePlayerTurn();
      checkWinner();
      return playerX.marker;
    } else {
      ticTacBoard.setArray(playerO.marker, divIdx);
      playerO.turn = !playerO.turn;
      playerX.turn = !playerX.turn;
      renderingToDOM.updatePlayerTurn();
      checkWinner();
      return playerO.marker;
    }
  }

  function checkWinner() {
    const curBoard = ticTacBoard.getArray();

    function checkIdx(idx) {
      if (idx.every((item) => curBoard[item] === "X")) {
        return true;
      } else if (idx.every((item) => curBoard[item] === "O")) {
        return true;
      } else {
        return false;
      }
    }

    if (
      checkIdx([0, 1, 2]) ||
      checkIdx([3, 4, 5]) ||
      checkIdx([6, 7, 8]) ||
      checkIdx([0, 3, 6]) ||
      checkIdx([1, 4, 7]) ||
      checkIdx([2, 5, 8]) ||
      checkIdx([0, 4, 8]) ||
      checkIdx([2, 4, 6])
    ) {
      renderingToDOM.playerDiv.textContent = `${
        playerX.turn ? "Player O Won!" : "Player X Won!"
      }`;
      renderingToDOM.endGame();
    } else if (
      curBoard.every((cell) => cell === "X" || (cell === "O" && cell !== null))
    ) {
      renderingToDOM.playerDiv.textContent = "It's a tie!";
    }
  }

  return { checkWinner, takeTurns, playerX, playerO };
})();

const renderingToDOM = (function (playerX, playerO) {
  const gridItems = document.querySelectorAll(".grid-item");
  const playerDiv = document.querySelector(".players");
  const restartBttn = document.querySelector(".restart-bttn");

  gridItems.forEach((gridItem) => gridItem.addEventListener("click", render));
  restartBttn.addEventListener("click", restartGame);

  function endGame() {
    gridItems.forEach((item) => item.removeEventListener("click", render));
  }

  function restartGame() {
    let getArray = ticTacBoard.getArray();
    for (let i = 0; i < getArray.length; i++) {
      gridItems[i].textContent = "";
      gridItems[i].addEventListener("click", render);
      gridItems[i].classList.remove("grid-item-clicked");
      if (getArray[i] !== null) {
        ticTacBoard.setArray(null, i);
      }
    }
    playerO.turn = false;
    playerX.turn = true;

    updatePlayerTurn();
  }

  function updatePlayerTurn() {
    playerDiv.textContent = `Player ${playerX.turn ? "X" : "O"}'s turn!`;
  }

  function render() {
    if (this.textContent === "X" || this.textContent === "O") {
      return;
    } else {
      this.textContent = gameController.takeTurns(this);
      this.classList.add("grid-item-clicked");
    }
  }
  return {
    playerDiv,
    endGame,
    restartBttn,
    updatePlayerTurn,
  };
})(gameController.playerX, gameController.playerO);
