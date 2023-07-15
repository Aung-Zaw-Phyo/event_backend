const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['upcomming', 'showing']
    },
    category: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Event', eventSchema)