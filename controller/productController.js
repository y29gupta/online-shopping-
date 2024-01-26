const product = require("../models/productModel")
const slugify = require('slugify')
const fs = require('fs')
const Razorpay = require('razorpay')
const crypto=require('crypto')

const order = require("../models/orderModal");



let instance = new Razorpay({
    key_id: process.env.RAZERPAY_API_KEYS,
    key_secret: process.env.RAZERPAY_SECRET_KEYS,
});

const productController = {
    addProduct: async (req, res) => {
        try {
            const { name, description, slug, price, quantity, category } = req.fields
            const { photo } = req.files

            switch (true) {
                case !name:
                    return res.status(201).json({ msg: "name is required", status: false })
                case !price:
                    return res.status(201).json({ msg: "price is required", status: false })
                case !description:
                    return res.status(201).json({ msg: "description is required", status: false })
                case !quantity:
                    return res.status(201).json({ msg: "quantity is required", status: false })
                case !category:
                    return res.status(201).json({ msg: "category is required", status: false })
                case photo && photo.size > 1000000:
                    return res.status(201).json({ msg: "image size cannot be more than  1 mb", status: false })
            }
            const products = new product({ ...req.fields, slug: slugify(name) })
            if (photo) {
                products.photo.data = fs.readFileSync(photo.path)
                products.photo.contentType = photo.type
            }
            await products.save()
            res.status(200).json({ data: products, msg: "product added successfully", status: true })

        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    getProduct: async (req, res) => {
        try {
            const products = await product.find().select('-photo').populate('category')
            if (!products) {
                res.status(201).json({ msg: "No products found", status: false })
            }

            res.status(200).json({ msg: "products listed successfully", data: products, status: true })
            // res.status(200).send({status:true,msg:"products listed successfully",data:products})
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    singleproduct: async (req, res) => {

        try {
            const products = await product.findOne({ slug: req.params.slug }).select('-photo').populate('category')
            if (!products) {
                return res.status(201).json({ msg: "No product found" })
            }
            res.status(200).json({ data: products, msg: "single product listed successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getphoto: async (req, res) => {
        try {
            const { pid } = req.params
            const products = await product.findById(req.params.pid).select('photo')
            if (products.photo.data) {
                res.set('content-type', products.photo.contentType)
                return res.status(200).send(products.photo.data)
            }
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await product.findByIdAndDelete(req.params.id).select('-photo')
            res.status(200).json({ msg: "product deleted successfully", status: true })
        } catch (err) {
            res.status(500).json({ msg: err.message, status: false })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { name, description, slug, price, quantity, category } = req.fields
            const { photo } = req.files

            switch (true) {
                case !name:
                    return res.status(400).json({ msg: "name is required" })
                case !price:
                    return res.status(400).json({ msg: "price is required" })
                case !description:
                    return res.status(400).json({ msg: "description is required" })
                case !quantity:
                    return res.status(400).json({ msg: "quantity is required" })
                case !category:
                    return res.status(400).json({ msg: "category is required" })
                case photo && photo.size > 1000000:
                    return res.status(400).json({ msg: "image size cannot be more than  1 mb" })
            }
            const products = await product.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) }, { new: true })
            if (photo) {
                products.photo.data = fs.readFileSync(photo.path)
                products.photo.contentType = photo.type
            }
            await products.save()
            res.status(200).json({ msg: "product updated successfully", status: true })

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    productfilter: async (req, res) => {
        try {
            const { checked, radio } = req.body

            let arg = {}
            if (checked.length > 0)
                arg.category = checked

            if (radio.length)
                arg.price = { $gte: radio[0], $lte: radio[1] }
            console.log(arg, "arg")
            const products = await product.find(arg).select('-photo')
            console.log(products, 'produc')
            res.status(200).json({ data: products, status: true, })

        } catch (err) {
            res.status(500).json({ status: false, message: err.message })
        }
    },
    productcountController: async (req, res) => {
        try {
            const total = await product.find({}).select('-photo').estimatedDocumentCount()
            console.log(total, "total")
            res.status(200).json({ data: total, status: true })
        }
        catch (err) {
            res.status(500).json({ msg: err.message, status: false })
        }
    },
    productListPerpage: async (req, res) => {
        try {
            let perpage = 4
            let page = req.params.page ? req.params.page : 1
            const products = await product.find({}).select('-photo').skip((page - 1) * perpage).limit(perpage)
            if (!product.length) {
                res.status(200).json({ msg: "No product found" })
            } else {

                res.status(200).json({ data: products, status: true })
            }
        }

        catch (err) {
            res.status(500).json({ status: false, msg: err.message })
        }
    },
    searchController: async (req, res) => {
        try {
            const { keyword } = req.params
            const products = await product.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-photo')
            res.status(200).json({ data: products, status: true })
        }
        catch (err) {
            res.status(500).json({ msg: err.message, status: false })
        }
    },
    similerProduct: async (req, res) => {
        try {
            const { pid, cid } = req.params
            const similerproduct = await product.find({
                category: cid,
                _id: { $ne: pid }
            }).select("-photo").limit(6).populate('category')

            if (similerproduct) {
                res.status(200).json({ msg: "similer products are listed successfully", status: true, data: similerproduct, count: similerproduct.length })
            }

        } catch (err) {
            res.status(500).json({ msg: err.message, status: false })
        }
    },
    checkout: async (req, res) => {
        try {
            const { totalPrice } = req.body
            // console.log(total, "sdrgoih")
            const options = {
                amount: Number(req.body.totalPrice * 100),  // amount in the smallest currency unit
                currency: "INR",
                // receipt: "order_rcptid_11"
            };
            instance.orders.create(options, function (err, order) {
                // console.log(order);
                res.status(200).json({ msg: "order created", success: true, order })
            });

        } catch (err) {
            console.log(err, "error")
            res.status(500).json({ msg: err.message })
        }
    },
    getKey: async (req, res) => {
        try {
            res.status(200).json({ success: true, key: process.env.RAZERPAY_API_KEYS })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    paymentVerify: async (req, res) => {
        try {
            const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body.response
            // const {cart}=req.body
            console.log(req.body.cart,"rewq")
            let body=razorpay_order_id + "|" + razorpay_payment_id
            let generated_signature=crypto.createHmac('sha256', process.env.RAZERPAY_SECRET_KEYS)
            .update(body.toString())
            .digest('hex')

            let signatureMatch=generated_signature===razorpay_signature
           
            if(signatureMatch){
                let totalamountoforder=req.body.cart.reduce((initialvalue,item)=>{
                   
                    initialvalue=initialvalue+item.amount
                    return initialvalue
                },0)
               const orders= new order({
                products:req.body.cart,
                totalAmount:totalamountoforder,
                payment:{
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature
                },
                buyer:req.user.id,
                
               })
               await orders.save()
               res.status(200).json({msg:"order placed successfully",orders})
            }else{
                 console.log("not matched")
            }
          

           
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    getOrderList:async (req,res)=>{
        try{
                const orders=await  order.find({buyer:req.user.id}).populate('buyer').populate('products','-photo')
                if(orders.length>0){
                    // res.status(200).json({msg:"we got the data here"})
                    res.status(200).json({order:orders,msg:'orders',status:true})
                }else{
                    res.status(201).json({msg:"No order placed"})
                }
        }catch(err){
            console.log(err.message)
        }
    },
    totalorder:async (req,res)=>{
        try{
                const orders=await  order.find().populate('buyer').populate('products','-photo')
                if(orders.length>0){
                    // res.status(200).json({msg:"we got the data here"})
                    res.status(200).json({order:orders,msg:'orders',status:true})
                }else{
                    res.status(201).json({orders,msg:"No order placed"})
                }
        }catch(err){
            console.log(err.message)
        }
    },
    updateOrderStatus:async (req,res)=>{
        try{
                const {id,status}=req.body
               
                const update= await order.findByIdAndUpdate(id,{status:status},{new:true})
              await   update.save()
              res.status(200).json({msg:"order status updated"})
        }catch(err){
            console.log(err.message)
        }
    }



}

module.exports = productController