//I will be attempting to build network maps of the political conversation.

//create an array of objects, where each object is a site with a url and associated metadata
    // [{site: url, bias: right, commentsNum: 0},{site: url, bias: left, commentsNum: 0}]

//Useful links:
//https://www.ted.com/talks/manuel_lima_a_visual_history_of_human_knowledge

const rp = require('request-promise')
const cheerio = require('cheerio')
const Promise = require('bluebird')



function scraper(options){
  const seneca = this
  return seneca.add({role: 'scraper', cmd: 'scrapeSites'}, scrapeSites)
}


function scrapeSites(args,done){
  return Promise.map(args.sites, (site) => {
    return crawlSite(site)
  })
  .then((data) => done(null, data))
  .catch(err => done(err,null))
}


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
  const headlines = $('article')//.text()
  // return headlines.split('         ').map(headline =>{
  //   return {'headline': headline}
  // })
  // console.log(headlines)
  return headlines
}

module.exports = scraper
