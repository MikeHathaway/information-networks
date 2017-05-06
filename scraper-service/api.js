module.exports = (app) => {

  app.post('/scraper', (req,res,next) => {
    console.log(req.body)
    res.status(200).send('hello')
  })


}
