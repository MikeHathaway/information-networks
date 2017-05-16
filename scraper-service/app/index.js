//I will be attempting to build network maps of the political conversation.

//create an array of objects, where each object is a site with a url and associated metadata
    // [{site: url, bias: right, commentsNum: 0},{site: url, bias: left, commentsNum: 0}]

//Useful links:
//https://www.ted.com/talks/manuel_lima_a_visual_history_of_human_knowledge

const rp = require('request-promise')
const cheerio = require('cheerio')
const Promise = require('bluebird')

//may be worth testing redis caching in the scraper services

//command to run docker
//sudo docker run -p 8080:8080 -p 3001:3001 --name node-tut -v $(pwd)/src:/usr/info-net-analysis --sig-proxy=false scraper-service npm start


function scrapeSites(args){
  console.log(args)

  if(Array.isArray(args) && args.length > 1){
    return Promise.map(args, (site) => {
      return crawlSite(site)
    })
    .then((data) => data)
    .catch(err => console.error(err))
  }
  return crawlSite(args)
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
  const headlines = $('article')

  return Object.keys(headlines).map(headline => {
    console.log(headlines[headline].children.text)
    // console.log(headlines[headline])
    // return headlines[headline]
    // return headlines[headline].text()
  })

  console.log(Object.keys(headlines['98']))

  // const headlines = $('meta[property="og:title"]')//.attr('content')

  // return headlines.split('  ').map(headline =>{
  //   return {'headline': headline}
  // })
}


// const headlines = $('meta[property="og:title"]')//.attr('content')
function siteHTMLtarget(args){
  return args.length > 1 ? args.map(findElement) : findElement(args[0])
}

function findElement(site){
  if(site === 'http://www.breitbart.com/'){
    return 'title'
  }
  else if(site === 'https://www.nytimes.com'){
    return 'story-heading'
    //'article'
    //'p.summary'
  }
  else if(site === 'http://www.realclearpolitics.com/'){
    return 'a'
  }
}

module.exports = scrapeSites
