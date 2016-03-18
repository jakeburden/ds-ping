const ping = require('./ping.js')
const ds = 'https://www.digitalsurgeons.com/'

module.exports = db => {
  const now = new Date().toISOString()
  ping(ds, (err, status) => {
    if (err) console.error(err)
    db.put('status!latest', status, (err) => {
      if (err) console.error(err)
    })
    db.put(`status!${now}`, status, err => {
      if (err) console.error(err)
    })
  })
}
