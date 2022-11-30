const server = require("../server.js")


const addProductToShoppingCart = async(req, res) => {
    try {
        const { email, product } = req.body;

        const userRef = server.db.collection('users').doc(email);
        const doc = await userRef.get();
        if (!doc.exists){
            res.status(400).send("Käyttäjää ei löytynyt.");
            return
        }
        const shoppingCartRef = doc.data().shoppingCart;
        console.log(shoppingCartRef);
        product.id = shoppingCartRef[shoppingCartRef.length - 1 ].id + 1;

        shoppingCartRef.push(product);
        console.log(shoppingCartRef);
        const response = await userRef.update({
            shoppingCart: shoppingCartRef
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
        const productId = req.params.productId;
        const email = req.params.email;
        const userRef = server.db.collection("users").doc(email);
        const response = await userRef.update({shoppingCart: FieldValue.arrayUnion(id)});
    } catch(err){
        res.status(400).send(err);
    }
};



exports.addProductToShoppingCart = addProductToShoppingCart;
exports.deleteProductFromShoppingCart = deleteProductFromShoppingCart;
exports.getMenu = getMenu;
exports.getShoppingCart = getShoppingCart
