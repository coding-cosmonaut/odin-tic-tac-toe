const ticTacBoard = (function () {
  const gameArray = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const getArray = () => gameArray;
  const setArray = (value, idx, innerIdx) => (gameArray[idx][innerIdx] = value);

  return { getArray, setArray };
})();

const players = function (name, marker) {
  return { name, marker };
};

const gameController = (function () {
    const playerX = players('X','X');
    const playerO = players('O','O');

    
})();
