const express = require("express");
const { getAllProducts, createProduct,getProductDetails, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles, } = require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts)
router.route("/admin/product/new").get(isAuthenticatedUser,authorizeRoles("admin"), createProduct)
router.route("admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"), 
updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetails)

module.exports = router;