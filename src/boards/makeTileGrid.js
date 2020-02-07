const path = require('path')

const makeTileGrid = (category, boardName, boards, DIMENSION) => {
  // generate tile src paths
  const tiles = boards[category][boardName]
  const paths = tiles.map(tileName => path.join(category, boardName, tileName))

  // construct 2D array
  const squares = new Array(DIMENSION);
  for (let i = 0; i < DIMENSION; i++) {
    squares[i] = new Array(DIMENSION);
  }

  // populate array with tile paths
  let tileNumber = 0
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      squares[i][j] = paths[tileNumber]
      tileNumber++
    }
  }
  squares[DIMENSION-1][DIMENSION-1] = null;

  // return populated 2D array
  return squares
}

module.exports = makeTileGrid
