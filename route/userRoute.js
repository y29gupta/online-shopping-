const userController = require('../controller/userController')
const adminAuth = require('../middleware/adminAuth')
const auth = require('../middleware/auth')

const route=require('express').Router()


route.post('/register',userController.register)
route.post('/login',userController.login)
route.get('/logout',userController.logout)
route.get('/getuser',auth , adminAuth,userController.getuser)
route.get('/user-auth', auth, userController.userAuth)
route.get('/admin-auth',auth, adminAuth, userController.isadmin)
route.put('/updateProfile',auth,userController.update)


module.exports=route