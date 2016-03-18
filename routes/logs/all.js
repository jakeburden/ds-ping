module.exports = db => (req, res) => {
  const log = db.createReadStream({
    gt: 'status',
    lt: 'status!~'
  })

  log.on('data', data => res.write(JSON.stringify(data)))
  log.on('end', () => res.end())
  log.on('error', err => res.end(err))
}
