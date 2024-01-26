const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    const token=req.header("Authorization")
    if(!token)
        return res.status(400).json({msg:" access token needed"})
         jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
          
        if(err)
        return res.status(400).json({msg:"Invalid access token"})
        req.user=user
        next()
    })
}

module.exports=auth