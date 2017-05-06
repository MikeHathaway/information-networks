const scraper = require('./index')

const defaultSites = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com',
  'http://www.economist.com/'
]

module.exports = (app) => {

  //returns default set of sites
  app.get('/scraper', handleScraperGet)
  app.post('/scraper', scrapeNewSite)


}


////////// Scraper API Handlers //////////
function handleScraperGet(req,res,next){
  // console.log(req.body)
  // const {giraffe} = req.body
  // console.log(siteToScrape)
  scraper(defaultSites)
    .then((headlines) => {
      return res.json(headlines[0])
    })
    .catch((err) => console.error(err))
}

const {giraffe} = req.body
