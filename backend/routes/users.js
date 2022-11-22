const express = require('express');
const router = express.Router();

userControllers = require("../controllers/users-controllers")

router.post("/register", userControllers.creteNewUser);