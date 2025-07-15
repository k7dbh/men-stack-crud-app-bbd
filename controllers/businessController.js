const express = require('express')
const router = express.Router()
//
const Business = require('../modules/business')
// everything in this file has /business front

////
//  TEST ROUTE
router.get('/', async (req,res) => { // async
    const allBusinesses = await Business.find() // await
    res.render('businesses/index.ejs', {allBusinesses: allBusinesses});
})

// RENDER NEW BUSINESS FORM
router.get('/new', (req, res) => {
    res.render('businesses/new.ejs')
})

// POST FORM DATA TO DATABASE --- This is the actual post request
router.post('/', async (req,res) => {    // add async
    // for the checkbox
    if (req.body.isVerified === 'on'){
        req.body.isVerified = true
    }else{
        req.body.isVerified = false
    }
    console.log(req.body)
    await Business.create(req.body)            // add await
    res.redirect('/businesses')
})

// SHOW ONE BUSINESS -- &&
router.get('/:businessId', async (req, res) => {
   const foundBusiness = await Business.findById(req.params.businessId)
   res.render('businesses/show.ejs',{
         foundBusiness
   })
})

/////////////////// day 2 progress ////////////////////////////
router.delete('/:businessId', async (req, res) => {
    await Business.findByIdAndDelete(req.params.businessId)
    res.redirect('/businesses')
})

// GET /businesses/:businessId/edit
// controller function should render 'businesses/edit.ejs' <--- ejs file should have edit form
router.get('/:businesses/edit', async (req,res) => {
    const foundBusiness = await Business.findById(req.params.businessId)
    res.render('businesses/edit.ejs', {foundBusiness: foundBusiness})
})

module.exports = router