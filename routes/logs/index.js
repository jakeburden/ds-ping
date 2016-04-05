module.exports = db => (req, res) => {
  const range = req.params.range
  const isLatest = range === 'latest'
  const ranges = {
    'all': '',
    'year': 4,
    'month': 7,
    'today': 10
  }
  var dateRange = new Date().toISOString().substring(0, ranges[range])
  if (isLatest) dateRange = range
  if (isLatest) {
    db.get(`status!latest`, console.log)
  }
  const log = db.createReadStream({
    gt: `status!${dateRange}`,
    lt: 'status!~'
  })

  log.on('data', data => res.write(JSON.stringify(data)))
  log.on('end', () => res.end())
  log.on('error', err => res.end(err))
}
