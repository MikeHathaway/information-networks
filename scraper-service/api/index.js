const apiHandlers = require('./handlers')

module.exports = (app) => {

  // Currently just returns default set of sites
  app.get('/scraper', apiHandlers.handleScraperGet)
  app.post('/scraper', apiHandlers.scrapeNewSite)

}
