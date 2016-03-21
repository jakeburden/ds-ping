module.exports = db => (req, res) => {
  const range = req.params.range
  const ranges = {
    'all': '',
    'year': 4,
    'month': 7,
    'today': 10
  }
  const dateRange = new Date().toISOString().substring(0, ranges[range])
  const log = db.createReadStream({
    gt: `status!${dateRange}`,
    lt: 'status!~'
  })

  log.on('data', data => res.write(JSON.stringify(data)))
  log.on('end', () => res.end())
  log.on('error', err => res.end(err))
}
