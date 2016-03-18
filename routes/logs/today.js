module.exports = db => (req, res) => {
  const today = new Date().toISOString().substring(0, 10)
  const log = db.createReadStream({
    gt: `status!${today}`,
    lt: 'status!~'
  })

  log.on('data', data => res.write(JSON.stringify(data)))
  log.on('end', () => res.end())
  log.on('error', err => res.end(err))
}
