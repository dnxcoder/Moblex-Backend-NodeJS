const jwt = require('jsonwebtoken');
require('dotenv').config();



const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader) res.status(400).send('Sorry the token was not sent !');

    const parts = authHeader.split(' ');

    const [scheme, token] = parts;


    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{

        if(err) res.status(400).send('Invalid Token !')

        console.log(decoded.id)
        req.userId = decoded.id;
        return next();
    })
}

module.exports= {

    auth
}