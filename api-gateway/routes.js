const routes = [{
  pin: 'role:admin,cmd:*',
  prefix: '/v1',
  postfix: '/?param=true',
  map: {
    scraper: {
      GET: true,
      POST: true,
      alias: '/scraper'
    },
    nlp: {
      GET: true,
      POST: true,
      redirect: '/'
    },
    database: {
      GET: true,
      POST: true,
      autoreply: false
    },
    login: {
      POST: true,
      auth: {
        strategy: 'local',
        pass: '/profile',
        fail: '/'
      }
    }
  }
}]

module.exports = routes
