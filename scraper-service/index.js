//I will be attempting to build network maps of the political conversation.

//create an array of objects, where each object is a site with a url and associated metadata
    // [{site: url, bias: right, commentsNum: 0},{site: url, bias: left, commentsNum: 0}]

//Useful links:
//https://www.ted.com/talks/manuel_lima_a_visual_history_of_human_knowledge

const rp = require('request-promise')
const cheerio = require('cheerio')
const Promise = require('bluebird')



function scrapeSites(sites){
  return Promise.map(sites, (site) => {
    return crawlSite(site)
  })
  .then((data) => data)
  .catch(err => console.error(err))
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


//may want to look into utilizing the .trim() string method
  //og:title
function retreiveMetaData($){
  // const headlines = $('article').text() //original approach
  const headlines = $('article').text()
  // const headlines = $('meta[property="og:title"]')//.attr('content')

  return headlines.split('  ').map(headline =>{
    return {'headline': headline}
  })
}


function checkSite(inputSites){
  if(site === 'breitbart'){
    return 'title'
  }
  else if(site === 'NYT'){
    return 'story-heading'
  }
}

module.exports = scrapeSites
