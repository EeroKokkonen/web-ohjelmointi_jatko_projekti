const express = require('express');
const userControllers = require("../controllers/user-controllers");

const router = express.Router();



router.post("/register", userControllers.createNewUser);
//router.post("/editProfile", userControllers.editProfile);
//router.post("/addNewProducts", userControllers.addProducts);
//router.post("/addOrder", userControllers.addOrder);

router.post("/login", userControllers.login);
//router.post("/authenticateUser", userControllers.authenticateUser);
router.get("/getProfile/:uid", userControllers.getProfile);

//router.get("/getShoppingCart", userControllers.getShoppingCart);

module.exports = router;


