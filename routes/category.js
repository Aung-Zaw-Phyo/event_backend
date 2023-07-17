const express = require('express')
const router  = express.Router()
const categoryController = require('./../controllers/category')
const { body } = require('express-validator')

router.get('/', categoryController.getCategories)

router.post('/', [
    body('name').trim().not().isEmpty(),
], categoryController.createCategory)

router.put('/:categoryId', [
    body('name').trim().not().isEmpty(),
], categoryController.updateCategory)

router.delete('/:categoryId', categoryController.deleteCategory)

module.exports = router