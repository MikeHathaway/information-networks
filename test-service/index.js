const rp = require('request-promise')

function testContainers(url){
  return rp(url)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => console.error(err))
}

//nlp analysis
testContainers('http://localhost:4000/analysis')

//web scraper
testContainers('http://localhost:3000/scraper')
