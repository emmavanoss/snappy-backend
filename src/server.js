const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const randomBoard = require('./getRandomBoard')
const shuffle = require('./shuffle')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://snappy.pictures");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('../assets/boards'))

app.get('/api/board', (req, res) => {
  res.send(shuffle(randomBoard()));
})

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})

