const rp = require('request-promise')
const mocha = require('mocha')

function testContainers(url){
  return rp(url)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => console.error(err))
}

//nlp analysis test
const nlpPort = 'http://localhost:4000/analysis'
testContainers(nlpPort)

//web scraper test
const scraperPort = 'http://localhost:3000/scraper'
testContainers(scraperPort)
