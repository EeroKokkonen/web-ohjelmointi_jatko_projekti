const server = require("../server.js")


const addProductToShoppingCart = async(req, res) => {
    try {
        const { email, product } = req.body;
        const response = await server.db.collection("users").doc(email).update({shoppingCart: FieldValue.arrayUnion(product)});
        res.status(200).send(response.id);
    } catch(err) {
        res.status(400).send(err);
    }
};

const getMenu = async(req, res) => {
    try{
        const menuRef = db.collection('menu').doc('menu');
        const doc = await menuRef.get();
        if (!doc.exists)
            return res.status(404).send(err);

        res.json(response.data())

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
