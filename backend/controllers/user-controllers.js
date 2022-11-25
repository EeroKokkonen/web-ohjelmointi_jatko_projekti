const crypto = require('crypto');
const server = require("../server.js")


const createNewUser = async (req, res) => {
    // Luo uuden käyttäjän
    try{
        // Parsii käyttäjän tiedot api pyynnöstä
        const {firstname, lastname, address, email, password} = req.body;
        const today = new Date();
        const newUser = {
            email,
            password,
            firstname,
            lastname,
            address,
            id: crypto.randomBytes(16).toString('hex'),
            today,
        };
        // Lisää databaseen käyttäjän
        const response = await server.db.collection("users").add(newUser);
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

exports.createNewUser = createNewUser;
exports.getProfile = getProfile;