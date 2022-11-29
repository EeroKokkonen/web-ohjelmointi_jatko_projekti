const express = require('express');
const productControllers = require("../controllers/product-controllers");

const router = express.Router();

// Asettaa jatkopolut ja niiden funktiot
router.get("/getMenu", productControllers.getMenu);
router.post("/addProductToShoppingCard", productControllers.addProductToShoppingCart);
router.delete("/deleteProductFromShoppingCard", productControllers.deleteProductFromShoppingCart);
router.get("/getShoppingCart", productControllers.getShoppingCart);


module.exports = router;
