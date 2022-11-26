const crypto = require('crypto');
const server = require("../server.js")

const createNewUser = async (req, res) => {
    // Luo uuden käyttäjän
    try{
        // Parsii käyttäjän tiedot api pyynnöstä
        const {firstname, lastname, address, email, password} = req.body;
        const today = new Date();
        const shoppingCart = [{
            foodName: "",
            foodPrice: ""
        }]
        const orderHistory = [{
            foodName: "",
            foodPrice: ""
        }]
        const newUser = {
            email,
            password,
            firstname,
            lastname,
            address,
            shoppingCart,
            orderHistory,
            today,
        };
        // Lisää databaseen käyttäjän
        console.log(newUser);

        const response = await server.db.collection("users").doc(newUser.email).set(newUser);
        console.log("Käyttäjä luotiin onnistuneesti!");

        res.status(201).send(`Created a new user: ${response.id}`);
    } catch (error) {
        res.status(400).send(`Invalid inputs`);
        console.log("Virhe käyttäjän luonnissa..");
    }
};

const getProfile = async (req, res) => {
    try {
        const userQuerySnapshot = await server.db.collection("users").get();
        const user = "TESTI";
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const addProductToShoppingCart = async(req, res) => {
    try {
        const{ email, product } = req.body;
        const response = await server.db.collection("users").doc(email).update({shoppingCart: FieldValue.arrayUnion(product)});
        res.status(200).send(response.id);
    } catch(err) {
        res.status(400).send(err);
    }
}

const getMenu = async(req, res) => {
    try{
        const response = await server.db.collection("menu").get();
        console.log(response);

    } catch(err){
        res.status(400).send(err);
    }
}

const deleteProductFromShoppingCart = async(req, res) => {
    try{
        const{id} = req.body;
        const response = await server.db.collection("users").doc(email).update({shoppingCart: FieldValue.arrayUnion(id)});
    } catch(err){
        res.status(400).send(err);
    }
};

exports.getMenu = getMenu;
exports.createNewUser = createNewUser;
exports.getProfile = getProfile;
exports.addProductToShoppingCart = addProductToShoppingCart;
exports.deleteProductFromShoppingCart = deleteProductFromShoppingCart;
