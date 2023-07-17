const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const multer = require('multer')
const uuid = require('uuid')
const path = require('path')

const eventRoutes = require('./routes/event')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'))
app.use("/images", express.static(path.join(__dirname, 'images')))

app.use('/events', eventRoutes)
app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({status: false, message: message, data: data})
})

mongoose.connect('mongodb://127.0.0.1:27017/event').then(res => {
    app.listen(8080, () => console.log('Server is listening on ', 8080))
}).catch(err => console.log(err))
