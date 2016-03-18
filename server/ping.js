const nets = require('nets')

module.exports = (url, cb) => {
  nets(url, (err, res) => {
    if (err) cb(err)
    cb(null, res.statusCode)
  })
}

