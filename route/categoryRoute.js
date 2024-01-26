
const categoryController = require('../controller/categoryController')
const adminAuth = require('../middleware/adminAuth')
const auth = require('../middleware/auth')

const route=require('express').Router()

route.post('/add',auth,adminAuth, categoryController.addCategory)
route.put('/update/:id', categoryController.updateCategory)
route.get('/category_list', categoryController.getallCategory)
route.get('/single_category/:slug', categoryController.getSingleCategory)
route.delete('/deleteCategory/:id', categoryController.deleteCategory)

module.exports=route