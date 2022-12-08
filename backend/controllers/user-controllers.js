const server = require("../server.js")

const createNewUser = async (req, res) => {
    // Luo uuden käyttäjän
    try{
        // Parsii käyttäjän tiedot api pyynnöstä
        const {firstname, lastname, address, email, password} = req.body;
        const date = new Date();
        const shoppingCart = [];
        const orderHistory = [];
        // Luo uuden käyttäjä objektin frontendistä tulevien tietojen avulla
        const newUser = {
            email,
            password,
            firstname,
            lastname,
            address,
            shoppingCart,
            orderHistory,
            date,
        };
        // Etsii tietokannasta käyttäjä collectionin
        const userRef = server.db.collection('users').doc(email);
        const doc = await userRef.get();

        // Tarkistaa löytyykö sähköpostilla tehtyä käyttäjää vielä tietokannasta
        if (!doc.exists) {
            // Tallentaa käyttäjän databaseen ja lähettää vastauksen frontendiin
            server.db.collection('users').doc(email).set(newUser);
            res.status(201).send(`Created a new user: ${doc.id}`);
            console.log("Käyttäjä luotiin onnistuneesti!");
            return;
        }
        else {
            res.status(400).send("Sähköposti on jo käytössä");
        }
        
    } catch (error) {
        res.status(400).send(`Käyttäjän luonti epäonnistui. Yritä myöhemmin uudestaan.`);
        console.log("Virhe käyttäjän luonnissa..");
    }
};

const getProfile = async (req, res) => {
    try {
        // Parsii uid:n 
        const uid = req.params.email;
        console.log(uid);
        const profileRef = server.db.collection('users').doc(uid);
        const doc = await profileRef.get();

        // Tarkastaa löytyykö profiilia
        if (!doc.exists)
            return res.status(404).send(err);

        res.json(doc.data())
    } catch (error) {
        res.status(500).send(error);
    }
}


const login = async(req, res) => {
    try{
        // Parsii sähköpostin ja salasanan frontendistä tulevasta datasta
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

const updateProfile = async(req, res) => {
    try {
        // Parsii uudet käyttäjäntiedot pyynnöstä
        const { email, password, firstname, lastname, address } = req.body;
        
        // Etsii käyttäjän tiedot
        const userRef = server.db.collection('users').doc(email);
        const doc = await userRef.get();
        if(!doc.exists){
            res.status(400).send("Käyttäjää ei löytynyt.");
            return;
        }
        // Laittaa päivitys pyynnön tietokantaan
        const response = await userRef.update({
            firstname: firstname,
            lastname: lastname,
            address: address,
            password: password,
        });
        res.status(200).send("Käyttäjän tiedot tallennettu onnistuneesti!");
    } catch(err) {
        res.status(400).send("Käyttäjän päivittäminen epäonnistui. Yritä myöhemmin uudelleen");
        console.log("Virhe")
    }
};

exports.updateProfile = updateProfile;
exports.login = login;
exports.createNewUser = createNewUser;
exports.getProfile = getProfile;

