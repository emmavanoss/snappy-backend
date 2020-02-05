const fs = require('fs')
const path = require('path')

const DIMENSION = 4

const getDirectoryNames = pathToScan => {
  return fs
    .readdirSync(path.join(__dirname, pathToScan), {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

const getTiles = pathToScan => {
  return fs
    .readdirSync(path.join(__dirname, pathToScan))
    .filter(file => file.startsWith('tile'))
    .sort()
}

const boards = {}

for (const category of getDirectoryNames('boards')) {
  const categoryBoards = getDirectoryNames(path.join('boards', category))
  boards[category] = { }
  for (const board of categoryBoards) {
    boards[category][board] = getTiles(path.join('boards', category, board))
  }
}

const makeTileGrid = (category, boardName) => {
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

const getRandomBoard = () => {
  const categories = Object.keys(boards)
  const category = categories[Math.floor(Math.random()*categories.length)]
  const catBoards = Object.keys(boards[category])
  const boardName = catBoards[Math.floor(Math.random()*catBoards.length)]

  return {
    category: category,
    boardName: boardName,
    tiles: makeTileGrid(category, boardName),
    solution: makeTileGrid(category, boardName)
  }
}

module.exports = getRandomBoard
