const mongoose=require('mongoose')

const Order=mongoose.Schema({
 products:[
    {
      require:true,
        type:mongoose.ObjectId,
        ref:'products'
    }
 ],
 totalAmount: {
   type: Number,
   required: true,
 },
 payment:{},
 buyer:{
   require:true,
    type:mongoose.ObjectId,
    ref:"users"
 },
 status:{
    type:String,
    default:'No processing',
    enum:['No processing','processing','shipped','delivered','cancel']
 }
},{
    timestamps:true
})

module.exports=mongoose.model('order',Order)