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
    await Business.create(req.body)            // add await
    res.redirect('/businesses/')
})

// SHOW ONE BUSINESS -- &&
router.get('/:businessId', async (req, res) => {
   const foundBusiness = await Business.findById(req.params.businessId)
   res.render('./businesses/show.ejs',{  foundBusiness: foundBusiness  })
})

/////////////////// day 2 progress ////////////////////////////
router.delete('/:businessId', async (req, res) => {
    await Business.findByIdAndDelete(req.params.businessId)
    res.redirect('/businesses')
})

// GET /businesses/:businessId/edit
// controller function should render 'businesses/edit.ejs' <--- ejs file should have edit form
router.get('/:businessId/edit', async (req,res) => {
    const foundBusiness = await Business.findById(req.params.businessId)
    res.render('businesses/edit.ejs', {foundBusiness: foundBusiness})
})

// PUT for submitting the form
router.put('/:businessId', async (req,res) => {
   if(req.body.isVerified === 'on') {
    req.body.isVerified = true
   }else{
    req.body.isVerified = false
   }
   await Business.findByIdAndUpdate(req.params.businessId, req.body)
   res.redirect(`/businesses/${req.params.businessId}`)
})

module.exports = router