const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    odds: {
        type: String,
        required: true
    }
});

module.exports = Events = mongoose.model('Events', EventSchema)