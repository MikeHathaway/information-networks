const app = require('express')()
const bodyparser = require('body-parser')
const request = require('request')

const port = process.env.PORT || '9000'

const routes = require('./routes')
const api = require('./api')
const mappings = [].concat(require('./routes.json'))

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

api(app)

//http://www.sascha.tech/2016/02/05/building-a-simple-api-gateway-with-expressjs/
//https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b


function appMethod(host, port, path, method){
  console.log(host,port,path,method)
    app.all(path, (req, res) => {
        console.log("[INFO] API request on %s:%s%s send to %s:%s%s", server.address().address, server.address().port, req.originalUrl, host, port, req.originalUrl)
        let rreq = null

        if(host.indexOf("http://") <= -1 && host.indexOf("https://") <= -1){
            host = "http://"+host
        }

        const url = host + ":" + port + req.originalUrl

        if(method.toUpperCase() === "POST" || method.toUpperCase() == "PUT"){
            rreq = request.post({uri: url, json: req.body})
        }
        else {
            rreq = request(url)
        }

        req.pipe(rreq).pipe(res)
    })
}

// stores the registered routes
const storedRoutes = []


// registers a route for each request
function registerRoutes(mappings){
  return mappings.map(route => {
    return route.redirects.forEach(redirect => {
      const method = redirect.method === undefined ? "GET" : redirect.method
      storedRoutes.push(appMethod(route.host, route.port, redirect.path, method))
      console.log("[INIT] Created route to %s %s:%s%s ", method.toUpperCase(), route.host, route.port, redirect.path)
    })
  })
}

registerRoutes(mappings)




app.use(errorHandler)

function errorHandler(err, req, res, next){
  throw new Error('Something went wrong!, err:' + err)
  res.status(500).send('Something went wrong!')
}



const server = app.listen(port, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(host)
  console.log('[INFO] listening at http://%s:%s', host, port)
})
