const app = require('express')()
const bodyparser = require('body-parser')
const port = process.env.PORT || '6000'
const databaseApi = require('./api')

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())


databaseApi(app)

app.use(errorHandler)

function errorHandler(err, req, res, next){
  throw new Error('Something went wrong!, err:' + err)
  res.status(500).send('Something went wrong!')
}

app.listen(port,() => {
  console.log(`Server listening at port ${port}`)
})
