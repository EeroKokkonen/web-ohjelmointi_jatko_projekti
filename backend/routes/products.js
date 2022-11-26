const express = require('express');
const userControllers = require("../controllers/product-controllers");

const router = express.Router();

router.get("/getMenu", userControllers.getMenu);
router.post("/addProductToShoppingCard", userControllers.addProductToShoppingCart);
router.delete("/deleteProductFromShoppingCard", userControllers.deleteProductFromShoppingCart);

module.exports = router;
