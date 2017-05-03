const seneca = require('seneca')()
const scraper = require('../scraper-service')
const textAnalyzer = require('../nlp-service')


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
// seneca.use(textAnalyzer)
// seneca.use(textAnalyzer, {texts: options.text})

//Defines a pattern to respond to, and the nature of that response
seneca.act({role: 'scraper', cmd: 'scrapeSites', sites: sitesOfInterest}, (err, result) => {
  if(err){
    console.error(err)
  }
  textAnalyzer(result)
})

//listens at the specified port for actions
seneca.listen({host:"localhost",port:"5000"});

//Test for listening
  //curl -d '{"role":"scraper","cmd":"scrapeSites","sites:"http://www.breitbart.com/"}' http://127.0.0.1:5000/act
