const server = require("../server.js")


const addProductToShoppingCart = async(req, res) => {
    try {
        const { email, product } = req.body;

        const userRef = server.db.collection('users').doc(email);
        const doc = await userRef.get();

        const shoppingCart = doc.data().shoppingCart;
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
        const{id} = req.body;
        const response = await server.db.collection("users").doc(email).update({shoppingCart: FieldValue.arrayUnion(id)});
    } catch(err){
        res.status(400).send(err);
    }
};



exports.addProductToShoppingCart = addProductToShoppingCart;
exports.deleteProductFromShoppingCart = deleteProductFromShoppingCart;
exports.getMenu = getMenu;
exports.getShoppingCart = getShoppingCart
