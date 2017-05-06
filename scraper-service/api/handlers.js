const scraper = require('../index')

const defaultSites = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com',
  'http://www.economist.com/'
]


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


module.exports = {
  handleScraperGet,
  scrapeNewSite
}
