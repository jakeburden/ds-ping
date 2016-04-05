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

const urls = require('./urls.json')
const storeStatus = require('./server/storeStatus.js')
const serveIndex = require('./routes/index.js')
const serveLogs = require('./routes/logs/index.js')

router.add('GET /', serveIndex(db))
router.add('GET /logs/{range}', serveLogs(db))

storeStatus(db, urls)
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

