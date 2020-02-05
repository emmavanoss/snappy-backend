const path = require('path')
const express = require('express')
const app = express()
const boards = require('./boards')
// const randomBoard = require('./getRandomBoard')
// const shuffle = require('./shuffle')

const port = process.env.PORT || 5000

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://snappy.pictures");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '..', 'assets', 'boards')))

app.get('/api/board', (req, res) => {
  res.send(boards.shuffle(boards.randomBoard()));
})

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})

