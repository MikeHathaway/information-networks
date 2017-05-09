const nlp = require('./../index')
const nlpHandlers = require('./handlers')

module.exports = (app,server) => {

    // app.get('/nlp', analyzeText)
    app.post('/analysis', analyzeText)

}


function analyzeText(req,res,next){
  const {text} = req.body
  console.log(text)
  nlp.callApi(text)
    .then((analysis) => {
      console.log(analysis)
      res.json(analysis)
      return res.end()
    })
    .catch((err) => next(err))
}
