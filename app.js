const seneca = require('seneca')()
const scraper = require('./scraper')

//Traditional means of interactions
const sitesOfInterest = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com'
]

function retreiveScrapedData(sitesOfInterest){
  return scraper.crawlingControlFlow(sitesOfInterest)
    .then((data) => console.log(data))
}

retreiveScrapedData(sitesOfInterest)


//Microservices methodology
seneca.use(scraper)

seneca.act({role: 'scraper', cmd: 'crawlingControlFlow', sites: sitesOfInterest}, (err, result) => {
  console.log(result)
})
