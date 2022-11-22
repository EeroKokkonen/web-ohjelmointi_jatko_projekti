const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(upload());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api/users",userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});