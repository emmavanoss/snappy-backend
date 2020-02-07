const boards = require('./boards') // categories, names, tiles
const selectRandom = require('./selectRandom') // fn, returns category & boardname
const makeTileGrid = require('./makeTileGrid') // fn, returns 2D array of tile paths
const shuffle = require('./shuffle')
const validate = null // TODO

const randomBoard = () => {
  const chosenBoard = selectRandom(boards)
  const category = chosenBoard.category
  const boardName = chosenBoard.boardName
  return {
    category: category,
    boardName: boardName,
    tiles: makeTileGrid(category, boardName, boards)
  }
}

module.exports = { randomBoard, shuffle, validate };
