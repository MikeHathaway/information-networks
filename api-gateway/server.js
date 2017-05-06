const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = process.env.PORT || '3000'
const routes = require('./routes')
const api = require('./index')

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())

api(app)

app.listen(port, () => {
  console.log('Listening on port', port)
});
