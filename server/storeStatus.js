const ping = require('./ping.js')

module.exports = (db, urls) => {
  urls.forEach(url => {
    const site = url.url
    const now = new Date().toISOString()
    ping(site, (err, status) => {
      if (err) console.error(err)
      db.put(`status!${site.split('http://')[1].split('.')[0]}!now`, status, err => {
        if (err) console.error(err)
      })
      db.put(`status!${site.split('http://')[1].split('.')[0]}!latest`, status, err => {
        if (err) console.error(err)
      })
      db.put('status!latest', status, err => {
        if (err) console.error(err)
      })
      db.put(`status!${now}`, status, err => {
        if (err) console.error(err)
      })
    })
  })
}
