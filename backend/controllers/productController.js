const Product = require("../models/productModule")


// Create Product
exports.createProduct = async (req, res, next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        sucess:true,
        product
    })
}

// Get All Product
exports.getAllProducts = async (req,res)=>{
    const products = await Product.find()

    res.status(200).json({
        sucess:true,
        products
    })
}

// Update Product -- Admin
exports.updateProduct = async (req,res, next)=>{
    let product = await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            sucess:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        sucess:true,
        product
    })
}

// Delete Product
exports.deleteProduct = async (req,res)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            sucess:false,
            message:"Product not found"
        })
    }

    await product.remove()

    res.status(200).json({
        sucess:true,
        message:"Product deleted"
    })
}

// Get Product Details
exports.getProductDetails = async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            sucess:false,
            message:"Product not found"
        })
    }

    res.status(200).json({
        sucess:true,
        product
    })
}