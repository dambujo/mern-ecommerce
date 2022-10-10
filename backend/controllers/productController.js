const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
const cathcAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/apifeature");


// Create Product
exports.createProduct = cathcAsyncErrors( async (req, res, next)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        sucess:true,
        product
    })
})

// Get All Product
exports.getAllProducts = cathcAsyncErrors(async (req,res)=>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeature(Product.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query
    
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
        product,
        productCount
    })
})

