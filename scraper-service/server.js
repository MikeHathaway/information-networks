const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = process.env.PORT || '3000'
const scraper = require('./index')

app.use(bodyparser.json())


console.log(scraper)

app.get('/',scraper)


app.use((err, req, res, next) => {
  reject(new Error('Something went wrong!, err:' + err))
  res.status(500).send('Something went wrong!')
  next()
})

app.listen(port,() => {
  console.log(`Server listening at port ${port}`)
})
