const server = require("../server.js")


const addProductToShoppingCart = async(req, res) => {
    try {
        const { email, product } = req.body;

        const userRef = server.db.collection('users').doc(email);
        console.log(email)
        const doc = await userRef.get();
        if (!doc.exists){
            res.status(400).send("Käyttäjää ei löytynyt.");
            return
        }
        const shoppingCart = doc.data().shoppingCart;
        if(shoppingCart.length > 0)
            product.id = shoppingCart[shoppingCart.length - 1 ].id + 1;
        else
            product.id = 0;

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
        const productId = req.query.productId;
        const email = req.query.email;

        const userRef = server.db.collection("users").doc(email);
        const doc = await userRef.get();
        const shoppingCart = doc.data().shoppingCart;

        let productFound = false;
        for (let i = 0; i < shoppingCart.length; i++){
            console.log(shoppingCart[i].id + "=" + productId)
            if (shoppingCart[i].id == productId) {
                console.log(shoppingCart);
                shoppingCart.splice(i, 1);
                console.log(shoppingCart);
                productFound = true;
            }
        }

        if(!productFound){
            return res.status(400).send("Tuotetta ei löytynyt ostoskorista.");
        }

        const response = await userRef.update({shoppingCart: shoppingCart});

        res.status(200).send("Tuote poistettu ostoskorista!");
    } catch(err){
        res.status(400).send(err);
    }
};

const orderShoppingCart = async(req,res) => {
    try{
        const email = req.query.email;
        const userRef = server.db.collection("users").doc(email);
        const doc = await userRef.get();
        const shoppingCart = doc.data().shoppingCart;
        const orderHistory = doc.data().orderHistory;

        const date = new Date();
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
