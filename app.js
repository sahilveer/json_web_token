const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;

// Generate the JWT
app.post('/user/generateToken', (req, res) => {
    const secret_key = 'supersecret';
    const data = {
        time: new Date(),
        userID: 12
    };

    const token = jwt.sign(data, secret_key);
    res.send(token);
});

// Validate the JWT
app.get('/user/validateToken', (req, res) => {
    // Passed in the header of the request
    const secret_key = 'supersecret';
    try {
        const userToken = req.headers.authorization.split(` `)[1];
        
        console.log(req);

        const verified = jwt.verify(userToken, secret_key);
        
        if (verified) {
            console.log(`JSON web token has been verified: ${verified}`);
            res.send('Token is valid');
        } else {
            console.log(`User is not authorized: ${verified}`);
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error: Unable to verify token');
    }
});

app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});