//https://www.textrazor.com/technology
  //one potential option

const seneca = require('seneca')()
const rp = require('request-promise')
const scraper = require('../scraper-service')

const dotenv = require('dotenv').config({path: 'nlp-service/.env'})
const api_key = process.env.API_KEY
const textRazorUrl = 'https://api.textrazor.com'
const api_endpoint = '/'


const sitesOfInterest = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com',
  'http://www.economist.com/'
]

function analyzeText(){

}

function callApi(text){
  return rp(setApiOptions(text))
    .then(result => {
      console.log(result)
      return result
    })
    .catch(error => console.error(error))
}

//topic.label
function setApiOptions(text){
  return {
    method: 'POST',
    uri: textRazorUrl + api_endpoint,
    headers: {
      'X-TextRazor-Key': api_key,
    },
    body: {
      text: text,
      'cleanup.mode': 'cleanHTML',
    },
    json: true
  }
}


seneca.use(scraper)

seneca.act({role: 'scraper', cmd: 'scrapeSites', sites: sitesOfInterest}, (err, result) => {
  if(err){
    console.error(err)
  }
  console.log(result)//.attribs)
  // callApi(result)
})
