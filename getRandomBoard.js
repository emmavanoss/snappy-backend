const fs = require('fs')
const path = require('path')

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

const getRandomBoard = () => {
  const categories = Object.keys(boards)
  const category = categories[Math.floor(Math.random()*categories.length)]
  const catBoards = Object.keys(boards[category])
  const boardName = catBoards[Math.floor(Math.random()*catBoards.length)]
  const tiles = boards[category][boardName]
  return {
    category: category,
    boardName: boardName,
    tilePaths: tiles.map(tileName => path.join(category, boardName, tileName)),
  }
}

module.exports = getRandomBoard
