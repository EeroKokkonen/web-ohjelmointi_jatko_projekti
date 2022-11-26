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
        const uid = req.params.email;
        console.log("uid");
        const profileRef = db.collection('users').doc(uid);
        const doc = await profileRef.get();

        if (!doc.exists)
            return res.status(404).send(err);

        res.json(response.data())
    } catch (error) {
        res.status(500).send(error);
    }
}



const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        //const response;
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.login = login;
exports.createNewUser = createNewUser;
exports.getProfile = getProfile;

