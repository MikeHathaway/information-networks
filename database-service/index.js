//built out knex stuff up in hurr

//implement row level security (psql) to allow certain data / tables to be private to certain microservices
  //retain the singleton database, but make the singleton be COMPOSED of restricted service specific tables.
const bluebird = require('bluebird')
const redis = require('redis')
const ReJSON = require('iorejson') //reddis JSON information interchange
const instance = new ReJSON()

const client = redis.createClient({
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error
            return new Error('The server refused the connection')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Retry time exhausted')
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000)
    }
})

//Enable usage of the async method chain on the redis client, providing promise syntax
bluebird.promisifyAll(redis.RedisClient.prototype)

client.on("error", handleErr)


function handleErr(err){
  return console.error(err)
}

//ReJSON package
function* initRedisConnect(){
  yield instance.connect()

  yield instance.set('foo', '.', {
    bar: [
      'hello world'
    ]
  })

  const value = yield instance.get('foo', '.')
  console.log(value)
  return value
}

initRedisConnect()
