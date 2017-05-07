const app = require('express')()
const bodyparser = require('body-parser')

const port = process.env.PORT || '9000'

const routes = require('./routes')
const reqHandlers = require('./reqHandlers')
// const mappings = [].concat(require('./routes.json'))

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(errorHandler)

function errorHandler(err, req, res, next){
  throw new Error('Something went wrong!, err:' + err)
  res.status(500).send('Something went wrong!')
}


//http://www.sascha.tech/2016/02/05/building-a-simple-api-gateway-with-expressjs/
//https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b



// start server
const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('[INFO] listening at http://%s:%s', host, port)
})


// handle speserver requests and route to specified microservices
reqHandlers(app,server)
