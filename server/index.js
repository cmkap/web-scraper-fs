const express = require('express')
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const events = require('./routes/api/events')

const port =  process.env.PORT || 8000

const app = express()

// Connect Database
connectDB(); 

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use('/events', events)

app.listen(port, () => console.log(`App listening on port ${port}`))