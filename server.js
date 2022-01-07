const webpack = require('webpack')
const express = require('express')
const path = require('path')
const app = express()
const config = require('./config/webpack.pm2')
const webpackDevMiddleware = require('webpack-dev-middleware')
const history = require('connect-history-api-fallback')
const isProduction = process.env.NODE_ENV === 'production'
const isDeveloping = !isProduction
const port = (isProduction && process.env.PORT) || 3008
let publicPath = path.resolve(__dirname, 'dist')
console.log('****NODE_ENV****', process.env.NODE_ENV)
if (isDeveloping) {
  const compiler = webpack(config)
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      noInfo: true
    })
  )
  app.set('views', path.join(__dirname, 'public'))
  app.set('view engine', 'ejs')
} else {
  app.use(history({ index: '/home/index.html' }))
  app.use('/home', express.static(publicPath))
}
app.get('*', function (req, res, next) {
  if (isDeveloping) {
    res.render('index')
  } else {
    res.sendFile(path.join(publicPath, '/index.html'))

  }
})

app.listen(port, function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log('Server running on port ' + port)
})
