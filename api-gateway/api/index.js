const scraper = require('../../scraper-service')
const analyzeText = require('../../nlp-service')


const sitesOfInterest = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com',
  'http://www.economist.com/'
]


module.exports = (app) => {

  //perform sentiment analysis on all texts
  app.get('/scraper/sentiment', (req,res,next) => {
    res.send('hello')
  })

  app.post('/scraper', (req,res,next) => {})

}
