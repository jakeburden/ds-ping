module.exports = db => (req, res) => {
  const year = new Date().toISOString().substring(0, 4)
  const log = db.createReadStream({
    gt: `status!${year}`,
    lt: 'status!~'
  })

  log.on('data', data => res.write(JSON.stringify(data)))
  log.on('end', () => res.end())
  log.on('error', err => res.end(err))
}
