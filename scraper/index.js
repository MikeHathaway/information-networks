//I will be attempting to build network maps of the political conversation.

//create an array of objects, where each object is a site with a url and associated metadata
    // [{site: url, bias: right, commentsNum: 0},{site: url, bias: left, commentsNum: 0}]

//Useful links:
//https://www.ted.com/talks/manuel_lima_a_visual_history_of_human_knowledge

const rp = require('request-promise')
const cheerio = require('cheerio')
const Promise = require('bluebird')


const pageToVisit = 'https://www.nytimes.com'
const sitesOfInterest = [
  'http://www.breitbart.com/',
  'https://www.nytimes.com'
]



function scraper(options){
  const seneca = this

  seneca.add({role: 'scraper', cmd: 'crawlingControlFlow'}, function(args,done) {
    const sitesToScrape = args.sites

    const result = Promise.map(sitesToScrape, (site) => {
      return crawlSite(site)
    })
    .then((data) => {
      done(null, data)
    })
    .catch(err => {
      done(err,null)
    })
  })
}


//Promise.map is the same as a map within a Promise.all(), part of Bluebird
// function crawlingControlFlow(listOfSites){
//   return Promise.map(listOfSites, (site) => {
//     return crawlSite(site)
//   })
//   .then((data) => {
//     return data
//   })
//   .catch(err => {
//     throw err
//   })
// }

function crawlSite(pageToVisit){
  return rp(pageToVisit)
    .then(targetHTML)
    .then(retreiveMetaData)
    .catch(err => {
      throw err
    })
}

function targetHTML(htmlString){
  return cheerio.load(htmlString)
}

function retreiveMetaData($){
  const headlines = $('article').text()
  return headlines.split('         ').map(headline =>{
    return {'headline': headline}
  })
}

// module.exports = {
//   crawlingControlFlow
// }

module.exports = scraper
