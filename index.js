const ticTacBoard = (function () {
  const gameArray = ['O', 'O', 'O', null, null, null, null, null, null];

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

  function checkWinner() {
    let curBoard = ticTacBoard.getArray();

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
      checkIdx([6, 4, 2]) && 
    ) {
      console.log("WIN??");
      console.log(ticTacBoard.getArray());
    }
  }

  return { checkWinner };
})();
