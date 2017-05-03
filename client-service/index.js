const seneca = require('seneca')()
const express = require('express')()
// const web = require('../../')
const routes = require('./routeMap')
// const Plugin = require('./common/plugin')

//based upon examples from
  //https://github.com/senecajs/seneca-web


const config = {
  routes: Routes,
  adapter: require('seneca-web-adapter-express'),
  context: express
}


seneca
  .use(Plugin)
  .use(web, config)
  .ready(() => {
    const server = seneca.export('web/context')()

    server.listen('4000', () => {
      console.log('server started on: 4000')
    })
  })
