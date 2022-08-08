const express = require('express');
const router = express.Router();

//Load Events model
const Events = require('../../models/Events')

const scrapers = require('../../scrapers')

// @route GET api/events/test
// @description tests events route
// @access Public


// middleware that is specific to this router

router.use((req, res, next) => {
    console.log('Time', Date.now())
    next()
})

router.get('/test', (req, res) => res.send('event route testing!'));

router.get('/', async (req, res) => {
    const events = [
        {"name":"Allaho","odds":"10/1"},
        {"name":"Monkfish","odds":"16/1"},
        {"name":"Stattler","odds":"16/1"},
        {"name":"Capodanno","odds":"20/1"},
        {"name":"Bravemansgame","odds":"25/1"}
    ]

    // todo GET from Database
    res.send(events)
  
})

router.post('/', async(req, res) => {
    console.log(req.body)
    const eventData = await scrapers.scrapeEvent(req.body.eventURL)// Scrape event
    console.log(eventData)
    // todo: Add to DB
    res.send('success')
})

module.exports = router;