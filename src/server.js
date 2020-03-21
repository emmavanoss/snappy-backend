const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const { Server } = require('ws');
const { v4: uuidv4 } = require('uuid');

const { randomBoard, shuffle, validate } = require('./boards')

const PORT = process.env.PORT || 5000;
const games = {};

const updateGameForUser = (gameId, userId, boardState) => {
  // TODO if gameId doesn't exist
  games[gameId].userStates[userId] = boardState;
}

// express server
const app = express()
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://snappy.pictures");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use(express.static(path.join(__dirname, '..', 'assets', 'boards')))
  .use(bodyParser.json())

app.get('/api/new-game', (req, res) => {
  const board = shuffle(randomBoard());
  const gameId = uuidv4();
  games[gameId] = {
    initialBoard: board,
    userStates: {},
  };
  res.send({ gameId: gameId });
});

app.get('/api/board/:id', (req, res) => {
  const id = req.params.id;
  const board = games[id].initialBoard;
  if (board) {
    console.log(`id requested: ${id}`);
    res.send(board);
  } else {
    res.status(404).json({
      success: 'false',
      message: 'board not found'
    });
  }
});

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// websocket server
const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    const payload = JSON.parse(message);
    updateGameForUser(payload.data.gameId, payload.userId, payload.data.board);
    const validState = validate(payload.data.board);
    ws.send(JSON.stringify(validState))
  });

  ws.on('close', () => console.log('Client disconnected'));
});
