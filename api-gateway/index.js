const seneca = require('seneca')()
const scraper = require('../scraper-service')
const nlp = require('../nlp-service')


const sitesOfInterest = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com',
  'http://www.economist.com/'
]


//Microservices methodology
  //http://jakepruitt.com/2015/02/09/beginners-guide-to-seneca-js.html
  //http://imatmati.github.io/blog/posts/seneca-docker

  //use this to provide a common base of dependencies that can be referenced by all services
    //https://github.com/eoinsha/node-seneca-base/tree/master/examples



seneca.use(scraper)

seneca.act({role: 'scraper', cmd: 'scrapeSites', sites: sitesOfInterest}, (err, result) => {
  if(err){
    console.error(err)
  }

  console.log(result)
})
