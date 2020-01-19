const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const getRandomBoard = require('./getRandomBoard')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://snappy.pictures");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('boards'))

app.get('/api/board', (req, res) => {
  res.send(getRandomBoard());
})

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})

