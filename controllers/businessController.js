const express = require('express')
const router = express.Router()

const Business = require('../modules/business')

// TEST ROUTE
router.get('/', (req,res) => {
    res.send('do i work?')
})

// RENDER NEW BUSINESS FORM
router.get('/new', (req, res) => {
    res.render('businesses/new.ejs')
})

// POST FORM DATA TO DATABASE
router.post('/', async (req,res) => {    // add async
    // for the checkbox
    if (req.body.isVerified === 'on'){
        req.body.isVerified = true
    }else{
        req.body.isVerified = false
    }
    console.log(req.body)
    await Business.create(req.body)            // add await
    res.redirect('/businesses/new')
})

module.exports = router