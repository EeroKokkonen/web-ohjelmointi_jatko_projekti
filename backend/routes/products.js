const express = require('express');
const productControllers = require("../controllers/product-controllers");

const router = express.Router();

// Asettaa jatkopolut ja niiden funktiot
router.get("/getMenu", productControllers.getMenu);
router.post("/addProductToShoppingCard", productControllers.addProductToShoppingCart);
router.delete("/deleteProductFromShoppingCart", productControllers.deleteProductFromShoppingCart);
router.get("/getShoppingCart/:email", productControllers.getShoppingCart);
router.get("/orderShoppingCart", productControllers.orderShoppingCart);
router.get("/getOrders", productControllers.getOrders);


module.exports = router;
