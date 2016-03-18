module.exports = db => (req, res) => {
  const month = new Date().toISOString().substring(0, 7)
  const log = db.createReadStream({
    gt: `status!${month}`,
    lt: 'status!~'
  })

  log.on('data', data => res.write(JSON.stringify(data)))
  log.on('end', () => res.end())
  log.on('error', err => res.end(err))
}
