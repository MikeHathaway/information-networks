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
  setApiOptions(text)
  console.log(setApiOptions(text).method)

  return rp(text)
    .then(result => {
      console.log(result)
      return result
    })
    .catch(error => console.error(error))
}

function setApiOptions(text){
  const options = {
    method: 'POST',
    uri: textRazorUrl + api_endpoint,
    'X-TextRazor-Key': api_key,
    text: text,
    'cleanup.mode': 'cleanHTML',
  }
  return options
}


seneca.use(scraper)

seneca.act({role: 'scraper', cmd: 'scrapeSites', sites: sitesOfInterest}, (err, result) => {
  if(err){
    console.error(err)
  }

  callApi(result[0])
})
