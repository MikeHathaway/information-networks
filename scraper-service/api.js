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
  return scraper(defaultSites)
    .then((headlines) => {
      return res.json(headlines)
    })
    .catch((err) => console.error(err))
}


function scrapeNewSite(req,res,next){
  const {urls} = req.body

  return scraper(urls)
    .then((headlines) => {
      return res.json(headlines)
    })
    .catch((err) => console.error(err))

}
