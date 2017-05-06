const scraper = require('../../scraper-service')
const analyzeText = require('../../nlp-service')


const sitesOfInterest = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com',
  'http://www.economist.com/'
]


// app.get('/',getSiteSentiment(sitesOfInterest))
//
//
//
//
// function getSiteSentiment(sitesOfInterest){
//   return (req,res,next) => {
//     return res.send(siteSentimentPromise(sitesOfInterest))
//   }
// }
//
// function siteSentimentPromise(sitesOfInterest){
//   return scraper(sitesOfInterest)
//     .then((data) => analyzeText(data[0]))
//     .then((result) => result)
//     .catch((err) => console.error(err))
// }
//


module.exports = (app) => {

  //perform sentiment analysis on all texts
  app.get('/scraper/sentiment', (req,res,next) => {
    res.send('hello')
  })

  app.post('/scraper', (req,res,next) => {})

}
