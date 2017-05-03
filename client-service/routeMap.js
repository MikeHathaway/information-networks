const routes = [{
  pin: 'role:admin,cmd:*',
  prefix: '/v1',
  postfix: '/?param=true',
  map: {
    home: {
      GET: true,
      POST: true,
      alias: '/home'
    },
    logout: {
      GET: true,
      redirect: '/'
    },
    profile: {
      GET: true,
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
