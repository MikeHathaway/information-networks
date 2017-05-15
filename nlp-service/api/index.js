const nlp = require('./../index')
const nlpHandlers = require('./handlers')

module.exports = (app,server) => {

    app.get('/analysis', sampleResponse)
    app.post('/analysis', analyzeText)

}

function sampleResponse(req,res,next){
  res.json('howdy dern from containerville')
}

function analyzeText(req,res,next){
  console.log(req.body)
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
