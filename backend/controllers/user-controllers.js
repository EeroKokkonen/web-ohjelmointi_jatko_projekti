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
        }];
        const orderHistory = [{
            foodName: "",
            foodPrice: ""
        }];
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
        const userRef = server.db.collection('users').doc(email);
        const doc = await userRef.get();
        
        if (!doc.exists) {
            server.db.collection('users').doc(email).set(newUser);
            res.status(201).send(`Created a new user: ${doc.id}`);
            console.log("Käyttäjä luotiin onnistuneesti!");
            return;
        }
        else {
            res.status(400).send("Email already exists");
        }
        
    } catch (error) {
        res.status(400).send(`Invalid inputs`);
        console.log("Virhe käyttäjän luonnissa..");
    }
};

const getProfile = async (req, res) => {
    try {
        const uid = req.params.email;
        console.log(uid);
        const profileRef = server.db.collection('users').doc(uid);
        const doc = await profileRef.get();

        if (!doc.exists)
            return res.status(404).send(err);

        res.json(doc.data())
    } catch (error) {
        res.status(500).send(error);
    }
}


const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        console.log(email);
        const userRef = server.db.collection('users').doc(email);
        const doc = await userRef.get();

        // Tarkistaa löytyykö käyttäjää ja täsmääkö sen salasana
        if(doc.exists){
            if (doc.data().password === password){
                res.status(200).send(email);
                return;
            }
        }
        
        res.status(400).send("Invalid credentials");
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = login;
exports.createNewUser = createNewUser;
exports.getProfile = getProfile;

