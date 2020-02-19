const path = require('path')

const boards = require('../src/boards/boards') // categories, names, tiles
const selectRandom = require('../src/boards/selectRandom') // fn, returns category & boardname
const makeTileGrid = require('../src/boards/makeTileGrid') // fn, returns 2D array of tile paths
const shuffle = require('../src/boards/shuffle')

const DIMENSION = 4

describe('boards', () => {
  describe('selectRandom', () => {
    it('returns a random category and boardName', () => {
      spyOn(Math, 'random').and.returnValue(0.1)
      board = selectRandom(boards)
      expect(board.category).toEqual('cats')
      expect(board.boardName).toEqual('grey')
    });
  });

  describe('makeTileGrid', () => {
    let grid

    beforeEach(() => {
      grid = makeTileGrid('cats', 'grey', boards, 4)
    })

    it('returns a 4 x 4 grid when dimension is 4', () => {
      expect(grid.length).toEqual(4)
      expect(grid[0].length).toEqual(4)
    });
  });
});
