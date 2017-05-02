const seneca = require('seneca')()
const scraper = require('./scraper')

const sitesOfInterest = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com'
]


//Microservices methodology
  //http://jakepruitt.com/2015/02/09/beginners-guide-to-seneca-js.html
seneca.use(scraper)

seneca.act({role: 'scraper', cmd: 'crawlingControlFlow', sites: sitesOfInterest}, (err, result) => {
  if(err){
    console.error(err)
  }

  console.log(result)
})
