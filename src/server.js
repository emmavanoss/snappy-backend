const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const { Server } = require('ws');

const { randomBoard, shuffle, validate } = require('./boards')

const PORT = process.env.PORT || 5000;

// express server
const app = express()
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://snappy.pictures");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use(express.static(path.join(__dirname, '..', 'assets', 'boards')))
  .use(bodyParser.json())

app.get('/api/board', (req, res) => {
  res.send(shuffle(randomBoard()));
})

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// websocket server
const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    const validState = validate(JSON.parse(message));
    ws.send(JSON.stringify(validState))
  });

  ws.on('close', () => console.log('Client disconnected'));
});
