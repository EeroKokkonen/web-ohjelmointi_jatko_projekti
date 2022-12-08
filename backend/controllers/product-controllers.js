const server = require("../server.js")


const addProductToShoppingCart = async(req, res) => {
    try {
        // Parsii tiedot pyynnöstä
        const { email, product } = req.body;
        // Etsii käyttäjää tietokannasta
        const userRef = server.db.collection('users').doc(email);
        const doc = await userRef.get();
        if (!doc.exists){
            res.status(400).send("Käyttäjää ei löytynyt.");
            return
        }
        // Lisää id:n tuotteelle
        const shoppingCart = doc.data().shoppingCart;
        if(shoppingCart.length > 0)
            product.id = shoppingCart[shoppingCart.length - 1 ].id + 1;
        else
            product.id = 0;

        // Lisää tuotteen ostoskoriin ja päivittää sen tietokantaan
        shoppingCart.push(product);
        const response = await userRef.update({
            shoppingCart: shoppingCart
        });

        res.status(200).send(response.id);
    } catch(err) {
        res.status(400).send(err);
    }
};

const getShoppingCart = async(req, res) => {
    try{
        const email = req.params.email;
        // Etsii ostoskorin tietokannasta
        const cartRef = server.db.collection('users').doc(email);
        const doc = await cartRef.get();
        // Tarkastaa löytyykö sitä tietokannasta
        if (!doc.exists)
            return res.status(404).send(err);
        res.json(doc.data().shoppingCart);
    } catch(err){
        res.status(400).send(err);
    }
};

const getMenu = async(req, res) => {
    try{
        
        // Etsii menun tietokannasta
        const menuRef = server.db.collection('menu').doc('menu');
        const doc = await menuRef.get();
        // Tarkastaa löytyykö sitä tietokannasta
        if (!doc.exists)
            return res.status(404).send(err);

        res.json(doc.data())
    } catch(err){
        res.status(400).send(err);
    }
};

const deleteProductFromShoppingCart = async(req, res) => {
    try{
        // Parsii sähköpostin ja poistettavan tuotteen url osoitteesta
        const productId = req.query.productId;
        const email = req.query.email;
        // Etsii käyttäjän tietokannasta
        const userRef = server.db.collection("users").doc(email);
        const doc = await userRef.get();
        const shoppingCart = doc.data().shoppingCart;

        // Etsii datasta poistettavaa tuotetta
        let productFound = false;
        for (let i = 0; i < shoppingCart.length; i++){
            if (shoppingCart[i].id == productId) {
                console.log(shoppingCart);
                shoppingCart.splice(i, 1);
                console.log(shoppingCart);
                productFound = true;
            }
        }
        // Katsoo löytyikö poistettavaa tuotetta
        if(!productFound){
            return res.status(400).send("Tuotetta ei löytynyt ostoskorista.");
        }

        // Päivittää uuden ostoslistan tietokantaan
        const response = await userRef.update({shoppingCart: shoppingCart});

        res.status(200).send("Tuote poistettu ostoskorista!");
    } catch(err){
        res.status(400).send(err);
    }
};

const orderShoppingCart = async(req,res) => {
    try{
        // Parsii
        const email = req.query.email;
        const userRef = server.db.collection("users").doc(email);
        // Etsii
        const doc = await userRef.get();
        const shoppingCart = doc.data().shoppingCart;
        const orderHistory = doc.data().orderHistory;

        // Muodostaa ajan tilaukselle
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const hours = today.getHours();
        const minutes = today.getMinutes();

        date = hours + "." + minutes + " " + dd + '/' + mm + '/' + yyyy;

        orderHistory.push({
            date: date,
            productOrder: shoppingCart,
        });

        const response = await userRef.update({
            shoppingCart: [],
            orderHistory: orderHistory
        });
        res.status(200).send("Tuotteet tilattu!");


    } catch (err) {
        res.status(400).send("Virhe");
    }
};

const getOrders = async(req, res) => {
    try{
        const email = req.query.email;
        const userRef = server.db.collection("users").doc(email);
        const doc = await userRef.get();
        const orderHistory = doc.data().orderHistory;
        console.log(orderHistory);
        res.status(200).send(orderHistory);
    } catch (err) {
        res.status(400).send("Tilauksia ei löytynyt. Yritä myöhemmin uudelleen");
    }
}

exports.getOrders = getOrders;
exports.orderShoppingCart = orderShoppingCart;
exports.addProductToShoppingCart = addProductToShoppingCart;
exports.deleteProductFromShoppingCart = deleteProductFromShoppingCart;
exports.getMenu = getMenu;
exports.getShoppingCart = getShoppingCart
