const express = require('express')
const app = express()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(err => {
  console.error(err)
  if (!res.headersSent) {
    res.status(500).json({message: 'Internal Server Error'})
  }
})
process.on('uncaughtException', (err) => console.error(err))
process.on('unhandledRejection', (err) => console.error(err))
process.on('SIGINT', () => process.exit(1))

app.use(express.static('dist'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get('/api', wrap(async (req, res) => {
  res.json('Hello World')
}))

app.post('/api/upload', upload.single('image'), wrap(async (req, res) => {
  console.log(req.body)
  console.log(req.file)
  res.json({image: req.file, ...req.body})
}))


if (process.env.NODE_ENV === 'dev') {
  const Bundler = require('parcel-bundler')
  const bundler = new Bundler('client/index.html', {})
  app.use(bundler.middleware())
}

app.listen(process.env.PORT || 3000, () => {
  console.log('Access to http://localhost:3000')
})

