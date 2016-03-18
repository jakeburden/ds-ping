const http = require('http')

const router = require('patterns')()
const ecstatic = require('ecstatic')({
  root: 'browser/dist/'
})

const level = require('level')
const db = level('db', {
  valueEncoding: 'json',
  keyEncoding: require('bytewise')
})

const storeStatus = require('./server/storeStatus.js')
const serveIndex = require('./routes/index.js')
const logsAll = require('./routes/logs/all.js')
const logsToday = require('./routes/logs/today.js')
const logsMonth = require('./routes/logs/month.js')
const logsYear = require('./routes/logs/year.js')

router.add('GET /', serveIndex(db))
router.add('GET /logs/all', logsAll(db))
router.add('GET /logs/today', logsToday(db))
router.add('GET /logs/month', logsMonth(db))
router.add('GET /logs/year', logsYear(db))


storeStatus(db)
setInterval(() => storeStatus(db), 120000)

const port = process.argv[2] || 9090

http.createServer((req, res) => {
  const match = router.match(`${req.method} ${req.url}`)

  if (!match) {
    ecstatic(req, res)
    return
  }

  const fn = match.value
  req.params = match.params
  fn(req, res)

}).listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

