const path = require('path')

const boards = require('./boards') // categories, names, tiles
const selectRandom = require('./selectRandom') // fn, returns category & boardname
const makeTileGrid = require('./makeTileGrid') // fn, returns 2D array of tile paths
const shuffle = require('./shuffle')

const DIMENSION = 4

const randomBoard = () => {
  const chosenBoard = selectRandom(boards)
  const category = chosenBoard.category
  const boardName = chosenBoard.boardName
  return {
    category: category,
    boardName: boardName,
    tiles: makeTileGrid(category, boardName, boards, DIMENSION)
  }
}

const validate = board => {
  const category = board.category
  const boardName = board.boardName

  const attempt = board.tiles
  const solution = makeTileGrid(category, boardName, boards, DIMENSION)

  if (JSON.stringify(attempt) === JSON.stringify(solution)) {
    const allTiles = boards[category][boardName]
    const finalTile = allTiles[allTiles.length - 1]
    const finalTilePath = path.join(category, boardName, finalTile)

    board.tiles[DIMENSION-1][DIMENSION-1] = finalTilePath
    return board
  } else {
    return false
  }
}

module.exports = { randomBoard, shuffle, validate };
