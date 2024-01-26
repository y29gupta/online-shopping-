const mongoose=require('mongoose')

const Category=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        lowercase:true,
        type:String
    }
},{
    collection:"categories",
    timestamps:true
})

module.exports=mongoose.model('categories',Category)