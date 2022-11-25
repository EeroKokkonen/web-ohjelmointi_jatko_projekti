const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cors = require('cors');
const { initializeApp } = require('firebase-admin/app');




const PORT = process.env.PORT || 3001;

const app = express();

initializeApp({
    credential: "./privaKey.json",
    databaseURL: 'https://herkkugrilli-database.firebaseio.com'

});

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});












//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
//const initializeApp =  require('firebase/app');

//const db = getFirestore(app);


/*const firebaseConfig = {
    apiKey: "",
    authDomain: "herkkugrilli-database.firebaseapp.com",
    databaseURL: "https://herkkugrilli-database.firebaseio.com",
    projectId: "herkkugrilli-database",
    storageBucket: "herkkugrilli-database.appspot.com",
    messagingSenderId: "id22",
    appId: "testi22",
    measurementId: "id",
};*/