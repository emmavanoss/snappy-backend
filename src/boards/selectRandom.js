const selectRandomBoard = boards => {
  const categories = Object.keys(boards)
  const category = categories[Math.floor(Math.random()*categories.length)]
  const catBoards = Object.keys(boards[category])
  const boardName = catBoards[Math.floor(Math.random()*catBoards.length)]

  return { category, boardName }
}

module.exports = selectRandomBoard;
