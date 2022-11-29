const express = require('express');
const userControllers = require("../controllers/user-controllers");
const router = express.Router();

// Asettaa jatkopolut ja niiden funktiot
router.post("/register", userControllers.createNewUser);
router.post("/login", userControllers.login);
router.get("/getProfile/:email", userControllers.getProfile);

module.exports = router;






//router.post("/editProfile", userControllers.editProfile);
//router.post("/addNewProducts", userControllers.addProducts);
//router.post("/addOrder", userControllers.addOrder);
//router.post("/authenticateUser", userControllers.authenticateUser);

