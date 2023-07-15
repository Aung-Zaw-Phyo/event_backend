const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const eventRoutes = require('./routes/event')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')

app.use('/events', eventRoutes)
app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)

mongoose.connect('mongodb://localhost:27017').then(res => {
    app.listen(8080, () => console.log('Server is listening on ', 8080))
}).catch(err => console.log(err))
