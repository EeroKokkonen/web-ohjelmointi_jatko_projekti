const crypto = require('crypto');


const createNewUser = async (req, res, next) => {
    const {firstname, lastname, address, email, password} = req.body;

    const today = new Date();
    const date = `${today.getHours()}.${today.getMinutes()}/${today.getDay()}.${today.getMonth()}.${today.getFullYear()}.`

    const newUser = {
        email,
        password,
        firstname,
        lastname,
        address,
        id: crypto.randomBytes(16).toString('hex'),
        date,
    };

    
};

exports.createNewUser = createNewUser;