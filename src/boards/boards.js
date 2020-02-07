const fs = require('fs')
const path = require('path')

const BOARDS_PATH = path.join(__dirname, '..', '..', 'assets', 'boards')

const boards = {}

const getDirectoryNames = pathToScan => {
  return fs
    .readdirSync(pathToScan, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

const getTiles = pathToScan => {
  return fs
    .readdirSync(pathToScan)
    .filter(file => file.startsWith('tile'))
    .sort()
}

for (const category of getDirectoryNames(BOARDS_PATH)) {
  const categoryBoards = getDirectoryNames(path.join(BOARDS_PATH, category))
  boards[category] = { }
  for (const board of categoryBoards) {
    boards[category][board] = getTiles(path.join(BOARDS_PATH, category, board))
  }
}

module.exports = boards;
