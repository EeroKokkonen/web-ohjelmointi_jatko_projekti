const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cors = require('cors');
const admin = require("firebase-admin");

// Asettaa portin, jota ruvetaan kuuntelemaan
const PORT = process.env.PORT || 3001;

const app = express();

// Lisää firebase yhteyden serveriin
admin.initializeApp({
    credential: admin.credential.cert("./privaKey.json"),
    databaseURL: 'https://herkkugrilli-database.firebaseio.com'
});


// Cors asetukset
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
};

// Asettaa cors asetukset, polut ja parserin
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Etsii databasen
const db = admin.firestore();

// Rupeaa kuuntelemaan pyyntöjä asetetusta portista (3001)
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

exports.db = db;