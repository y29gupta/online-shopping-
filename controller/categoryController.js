const Category=require('../models/categoryModel')
const slugify=require('slugify')

const categoryController={
    addCategory:async (req,res)=>{
        try{
            const {name}=req.body
          
           if(!name)
         return  res.status(201).json({msg:'category is required'})
            
           const existingcategory= await Category.findOne({name})
           if(existingcategory)
           return res.status(200).json({msg:"category already exists"})
            await Category({name,slug:slugify(name)}).save() 
            res.status(200).json({msg:"category added successfullly"})
        } catch (err) {
            res.json({ msg: err.message })
           
        }
    },
    updateCategory:async (req,res)=>{
        try{

            const {name}=req.body
            const id=req.params.id
            if(!name)
            res.status(401).json({msg:"please enter category name"})
            const updatecat=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)})
            res.status(200).json({msg:"category updated successfully",updatecat})

        }catch(err){
            res.json({msg:err.message})
        }
    },
    getallCategory: async (req,res)=>{
        try{
              
                const categoryList=await Category.find()
                if(categoryList=="")
                res.status(400).json({msg:"No data found"})
                res.status(200).json({msg:"category list is here",categoryList,count:categoryList.length})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    getSingleCategory: async (req,res)=>{
        try{
              
                const singlCategory=await Category.findOne({slug:req.params.slug})
                if(!singlCategory)
                return res.status(400).json({msg:"No category found"})

                res.status(200).json({success:true,msg:"single category accessed successfully",singlCategory})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    deleteCategory: async (req,res)=>{
        try{
              
                const {id}=req.params
             const deleteCat=   await Category.findByIdAndDelete(id)
             if(!deleteCat)
             res.status(401).json({msg:"something went wrong"})
            res.status(200).json({msg:"category deleted successfully"})
             
                
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    }
}
module.exports=categoryController