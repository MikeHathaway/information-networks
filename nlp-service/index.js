//https://www.textrazor.com/technology
//https://www.npmjs.com/package/google-nlp

//https://softwareengineering.stackexchange.com/questions/343669/microservice-interaction-and-formatting

const Promise = require('bluebird')
const dotenv = require('dotenv').config({path: './.env'})
const apiKey = process.env.GOOGLE_API_KEY
const NLP = require('google-nlp')
const nlp = new NLP(apiKey)



function analyzeText(texts){
  return Promise.map(texts, (text) => {
    return callApi(text.headline)
  })
  .then((data) => data)
  .catch(err => console.error(err))
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




module.exports = {
  analyzeText,
  callApi
}
