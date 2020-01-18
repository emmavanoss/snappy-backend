const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/api/hello-world', (req, res) => {
  res.send('Hello, World')
})

app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})

