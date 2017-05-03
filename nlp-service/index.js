//https://www.textrazor.com/technology
//https://www.npmjs.com/package/google-nlp

const seneca = require('seneca')()
const Promise = require('bluebird')
const scraper = require('../scraper-service')
const dotenv = require('dotenv').config({path: 'nlp-service/.env'})
const api_key = process.env.GOOGLE_API_KEY
const NLP = require('google-nlp')
const nlp = new NLP(api_key)


const sitesOfInterest = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com',
  'http://www.economist.com/'
]

function textAnalyzer(options){
  const seneca = this
  return seneca.add({role: 'analysis', cmd: 'analyzeText'}, analyzeText)
}

function analyzeText(args,done){
  return Promise.map(args.texts, (text) => {
    return callApi(text)
  })
  .then((data) => done(null, data))
  .catch(err => done(err,null))
}

function callApi(text){
  return nlp.analyzeSentiment(text)
      .then((sentiment) => {
          console.log( 'Sentiment:', sentiment.sentences );
          return sentiment
      })
      .catch((error) => {
          console.log( 'Error:', error.message );
      })
}


seneca.use(scraper)

seneca.act({role: 'scraper', cmd: 'scrapeSites', sites: sitesOfInterest}, (err, result) => {
  if(err){
    console.error(err)
  }
  // console.log(result)//.attribs)
  const breitbartSentiment = callApi(result[0][0].headline)
  console.log(breitbartSentiment)
})




module.exports = textAnalyzer
