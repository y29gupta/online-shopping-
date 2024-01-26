
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
const adminAuth= async(req,res,next)=>{

    const isadmin=await User.findById(req.user.id)
    if(isadmin.role !==1)
        return res.status(400).json({msg:"Unauthorized access"})
    next()
}

module.exports=adminAuth