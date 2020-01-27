const DIMENSION = 4

const shuffleTiles = board => {

  const squares = new Array(DIMENSION);
  for (let i = 0; i < DIMENSION; i++) {
    squares[i] = new Array(DIMENSION);
  }

  let tileNumber = 0

  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      squares[i][j] = board.tilePaths[tileNumber]
      tileNumber++
    }
  }
  squares[DIMENSION-1][DIMENSION-1] = null;

  board.tilePaths = squares;

  const findSpace = (rowIndex, colIndex) => {
    const squares = board.tilePaths.slice();
    const toCheck = [
      [rowIndex, colIndex - 1],
      [rowIndex, colIndex + 1],
      [rowIndex - 1, colIndex],
      [rowIndex + 1, colIndex],
    ];

    for (const coords of toCheck) {
      const rowIndex = coords[0];
      const colIndex = coords[1];
      if (rowIndex < 0 || colIndex < 0) {
        continue;
      }
      if (rowIndex >= squares.length || colIndex >= squares[rowIndex].length) {
        continue;
      }
      if (squares[rowIndex][colIndex] === null) {
        return [rowIndex, colIndex];
      }
    }

    return null
  }

  const swapSquares = (coordsA, coordsB) => {
    const squares = board.tilePaths.slice();
    const valueA = squares[coordsA[0]][coordsA[1]]
    const valueB = squares[coordsB[0]][coordsB[1]]
    squares[coordsA[0]][coordsA[1]] = valueB
    squares[coordsB[0]][coordsB[1]] = valueA
    board.tilePaths = squares
  }

  const handleSquareClick = (rowIndex, colIndex) => {
    const coordsBlank = findSpace(rowIndex, colIndex);
    if (coordsBlank === null) return;
    const coordsClick = [rowIndex, colIndex]
    swapSquares(coordsClick, coordsBlank)
  }

  const shuffle = () => {
    const shuffleAmount = Math.floor(Math.random() * 10000) + 1000
    for (let i = 0; i < shuffleAmount; i++) {
      const a = Math.floor(Math.random() * DIMENSION)
      const b = Math.floor(Math.random() * DIMENSION)
      handleSquareClick(a, b)
    }
  }

  shuffle()

  return board
}

module.exports = shuffleTiles;

// board data structure
// {
// category: ''
// boardName: ''
// tilePaths: ['a/a/a', 'a/a/b', ...]
// }
//
//
//



