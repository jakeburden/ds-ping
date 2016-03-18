const fs = require('fs')

const postcss = require('postcss')
const atImport = require('postcss-import')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const uncss = require('uncss')

const css = fs.readFileSync('browser/css/index.css', 'utf8')

const htmls = ['browser/index.html',
               'components/up.html',
               'components/down.html']

postcss([atImport, autoprefixer])
  .process(css, {
    from: 'browser/css/index.css'
  })
  .then(result => {
    fs.writeFileSync('browser/dist/app.bundle.css', result.css)
    const opts = {
      stylesheets: ['dist/app.bundle.css'],
      csspath: '../browser'
    }
    uncss(htmls, opts, (err, output) => {
      if (err) console.error(err)
      fs.writeFileSync('browser/dist/app.bundle.css', output)
      postcss([cssnano])
        .process(output)
        .then(result => {
          fs.writeFileSync('browser/dist/app.bundle.css', result.css)
        })
    })
  })

