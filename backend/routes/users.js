const express = require('express');
const userControllers = require("../controllers/user-controllers");

const router = express.Router();



router.post("/register", userControllers.createNewUser);
//router.post("/editProfile", userControllers.editProfile);
//router.post("/addNewProducts", userControllers.addProducts);
//router.post("/addOrder", userControllers.addOrder);
//router.post("/authenticateUser", userControllers.authenticateUser);
router.get("/getProfile", userControllers.getProfile);
//router.get("/getProducts", userControllers.getProducts);
//router.get("/getShoppingCart", userControllers.getShoppingCart);

module.exports = router;


