const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = process.env.PORT || '3000'
const scraperAPI = require('./api.js')

app.use(bodyparser.json())


scraperAPI(app)

app.use((err, req, res, next) => {
  reject(new Error('Something went wrong!, err:' + err))
  res.status(500).send('Something went wrong!')
  next()
})

app.listen(port,() => {
  console.log(`Server listening at port ${port}`)
})


//https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b
