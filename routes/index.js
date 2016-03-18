const fs = require('fs')
const hyperstream = require('hyperstream')

module.exports = db => (req, res) => {
  const html = fs.createReadStream('browser/index.html')

  db.get('status!latest', (err, status) => {
    if (err) return console.error(err)
    const upORdown = status === 200
      ? fs.createReadStream('components/up.html')
      : fs.createReadStream('components/down.html')

    const hs = hyperstream({
      '#container': upORdown
    })

    html.pipe(hs).pipe(res)
  })
}
