const express = require('express')
const app = express()
const PORT= 8000

const bodyParser = require('body-parser');

const scrapers = require('./scrapers')

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/events', async (req, res) => {
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

app.post('/events', async(req, res) => {
    console.log(req, res)
    const eventData = await scrapers.scrapeEvent(req.body.eventURL)// Scrape event
    // todo: Add to DB
    res.send('success')
})



app.listen(PORT, () => console.log(`App listening on port ${PORT}`))