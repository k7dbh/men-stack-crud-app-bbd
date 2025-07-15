require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path')
//
const methodOverride = require('method-override')
const morgan = require('morgan')

// CONTROLLERS to locate the folders  /// --
const businessController = require('./controllers/businessController')

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extend: false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// GET / (home)
app.get('/', (req, res) => {
    res.render('index.ejs')
})

// ROUTES to businnessController --  &&
app.use('/businesses', businessController)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})