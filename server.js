const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://snappy.pictures");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/hello-world', (req, res) => {
  res.send('Hello, World');
})

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})

