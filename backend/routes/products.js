const express = require('express');
const productControllers = require("../controllers/product-controllers");

const router = express.Router();

router.get("/getMenu", productControllers.getMenu);
router.post("/addProductToShoppingCard", productControllers.addProductToShoppingCart);
router.delete("/deleteProductFromShoppingCard", productControllers.deleteProductFromShoppingCart);

module.exports = router;
