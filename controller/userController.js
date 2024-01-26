const User = require('../models/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const { createAccessToken } = require('../middleware/token')
const userController = {
    register: async (req, res) => {
        try {
            const data = User(req.body)
             const extuser = await User.findOne({ email: data.email })
            if (extuser)
                return res.status(200).json({ msg: "user already exists",status:false })

            const passwordhash = await bcrypt.hash(data.password, 10)
            const userdetail = new User({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: passwordhash,
                address: data.address

            })

            await userdetail.save()
            res.status(200).json({ msg: "User registered successfully", status: true })
        } catch (err) {
            res.json({ msg: err.message })
            console.log(err,"error")
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            if(!email || !password){
                return res.status(200).json({ msg: "Please enter username and password" })

            }
            const existingEmail = await User.findOne({ email })
            if (!existingEmail)
                return res.status(200).json({ msg: "Use does not exists" ,status:false})

            const matchPwd = await bcrypt.compare(password, existingEmail.password)

            if (!matchPwd)
                return res.status(200).json({ msg: "Passord does not match",status:false })
            let accessToken = createAccessToken({ id: existingEmail._id })
            res.status(200).json({
                msg: "User logged in successfullyy",
                status:true,
                user: {
                    token:accessToken,
                    userInfo:await User.findById(existingEmail._id).select("-password")
                }
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req,res)=>{
        try{
            // res.clearCookie('refToken',{path:'/api/auth/refToken'})
          return  res.status(200).json({msg:"Logout successfully",status:true})
        }catch(err){
         return   res.status(500).json({msg:err})
        }

    },
    getuser:async (req,res)=>{
        try{
                res.json({msg:'token is set'})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    userAuth: async (req,res)=>{
        res.status(200).json({status:true})
    },
    isadmin: async (req,res)=>{
        res.status(200).json({status:true})
    },
    update: async (req, res) => {
        try {
            const data = User(req.body)
            console.log(data.password,"length")
             const userdata = await User.findById(req.user.id)
            if(  data.password !="" && data.password.length<6)
            return res.status(200).json({msg:"password is required and cannot be less than 6",status:false})
            
            const passwordEncrypt=data.password? await bcrypt.hash(data.password, 10):undefined
          
            const updateuser = await  User.findByIdAndUpdate(req.user.id,{
                name: data.name ||userdata.name,
                // email: data.email || userdata.email,
                phone: data.phone || userdata.phone,
                password: passwordEncrypt || userdata.password,
                address: data.address ||userdata.address

            },{new:true})

            res.status(200).json({ msg: "User registered successfully", status: true,user:updateuser })
        } catch (err) {
            res.json({ msg: err.message })
            console.log(err,"error")
        }
    },
}

module.exports = userController