const { validationResult } = require('express-validator')
const path = require('path')
const fs = require('fs')
const Category = require('./../models/category')

exports.getCategories = async(req, res, next) => {
    try {
        const currentPage = req.query.page || 1
        const perPage = 3
        const totalItems = await Category.find().countDocuments()
        const categories = await Category.find().skip((currentPage - 1) * perPage).limit(perPage)
        res.status(200).json({message: 'Fetch all categories.', categories: categories, totalItems: totalItems})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500
        }
        next(error)
    }
}

exports.createCategory = async (req, res, next) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const error = new Error('Validation failed.')
            error.statusCode = 422
            throw error
        }
        const isFileExist = req.file && (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/webp')
        if( !isFileExist ) {
            const error = new Error('Please upload a valid image.')
            error.statusCode = 422
            throw error
        }
        const name = req.body.name
        let imageUrl = req.file.path.replace("\\", "/");
        const category = await Category({
            name: name,
            image: imageUrl
        }).save()
        res.status(201).json({status: true, message: 'Category created successfully!', category: category})
    } catch (error) {
        next(error)
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const id = req.params.categoryId
        const category = await Category.findById(id);
        if(!category) {
            const error = new Error('Not Authorized!')
            error.statusCode = 401
            throw error
        }
        const name = req.body.name
        let image = category.image
        if( req.file ) {
            const isFileExist = req.file && (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/webp')
            if(!isFileExist) {
                const error = new Error('Please upload a valid image.')
                error.statusCode = 422
                throw error
            }
            image = req.file.path.replace("\\", "/");
        }

        if (image !== category.image) {
            clearImage(category.image)
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, {name: name, image: image})

        res.status(200).json({status: true, message: 'Category updated successfully.', category: updatedCategory})
    } catch (error) {
        next(error)
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.categoryId
        const category = await Category.findById(id);
        if(!category) {
            const error = new Error('Not Authorized!')
            error.statusCode = 401
            throw error
        }
        const deletedCategory = await Category.findByIdAndDelete(id)
        clearImage(category.image)
        res.status(200).json({status: true, message: 'Category deleted successfully.', category: deletedCategory})
    } catch (error) {
        next(error)
    }
}

const clearImage = (filePath) => {
    filePath = path.join(__dirname, '..', filePath)
    fs.unlink(filePath, err => console.log(err))
}