const express = require("express");
const { getAllProducts, createProduct,getProductDetails, updateProduct, deleteProduct } = require("../controllers/productController");

const router=express.Router();

router.route("/products").get(getAllProducts)
router.route("/product/new").get(createProduct)
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)

module.exports = router