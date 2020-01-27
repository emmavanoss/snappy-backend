const DIMENSION = 4

const shuffleTiles = board => {
  const shuffleAmount = Math.floor(Math.random() * 10000) + 1000

  const findSpace = (rowIndex, colIndex) => {
    const squares = board.tiles.slice();
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
    const squares = board.tiles.slice();
    const valueA = squares[coordsA[0]][coordsA[1]]
    const valueB = squares[coordsB[0]][coordsB[1]]
    squares[coordsA[0]][coordsA[1]] = valueB
    squares[coordsB[0]][coordsB[1]] = valueA
    board.tiles = squares
  }

  for (let i = 0; i < shuffleAmount; i++) {
    const rowIndex = Math.floor(Math.random() * DIMENSION)
    const colIndex = Math.floor(Math.random() * DIMENSION)
    const coordsBlank = findSpace(rowIndex, colIndex);

    if (coordsBlank !== null) {
      swapSquares([rowIndex, colIndex], coordsBlank);
    }
  }

  return board
}

module.exports = shuffleTiles;
