const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const request = require('request')
const port = process.env.PORT || '3000'
const routes = require('./routes')
const api = require('./api')

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

api(app)

//http://www.sascha.tech/2016/02/05/building-a-simple-api-gateway-with-expressjs/
const appMethod = function(host, port, path, method){
    app.all(path, (req, res) => {
        console.log("[INFO] API request on %s:%s%s send to %s:%s%s", server.address().address, server.address().port, req.originalUrl, host, port, req.originalUrl)
        let rreq = null

        if(host.indexOf("http://") <= -1 && host.indexOf("https://") <= -1){
            host = "http://"+host
        }

        const url = host+":"+port+req.originalUrl

        if(method.toUpperCase() === "POST" || method.toUpperCase() == "PUT"){
            rreq = request.post({uri: url, json: req.body})
        }
        else {
            rreq = request(url)
        }

        req.pipe(rreq).pipe(res)
    })
}


app.use(errorHandler)

function errorHandler(err, req, res, next){
  throw new Error('Something went wrong!, err:' + err)
  res.status(500).send('Something went wrong!')
}

app.listen(port, () => {
  console.log('Listening on port', port)
})
