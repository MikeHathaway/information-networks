const apiHandlers = require('./handlers')


module.exports = (app) => {

  app.get('/database',apiHandlers.retreiveData)
  
}
