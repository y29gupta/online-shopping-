const mongoose=require('mongoose')

const Product=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        require:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'categories',
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    // shipping:{
    //     type:Boolean
    
    // }
},{
    timeStamps:true
})

module.exports=mongoose.model('products',Product)