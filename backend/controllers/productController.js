const Product = require("../models/productModule");
const ErrorHandler = require("../utils/errorhander");
const cathcAsyncErrors = require("../middleware/catchAsyncError");


// Create Product
exports.createProduct = cathcAsyncErrors( async (req, res, next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        sucess:true,
        product
    })
})

// Get All Product
exports.getAllProducts = cathcAsyncErrors(async (req,res)=>{
    const products = await Product.find()

    res.status(200).json({
        sucess:true,
        products
    })
})

// Update Product -- Admin
exports.updateProduct = cathcAsyncErrors(async (req,res, next)=>{
    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
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
})

// Delete Product
exports.deleteProduct =cathcAsyncErrors( async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.remove()

    res.status(200).json({
        sucess:true,
        message:"Product deleted"
    })
}
)
// Get Product Details
exports.getProductDetails =cathcAsyncErrors( async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        sucess:true,
        product
    })
})