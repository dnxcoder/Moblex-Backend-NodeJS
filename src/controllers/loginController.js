const bycriptjs = require('bcryptjs');
const knexApp = require('../database/connection');
const jwt = require('jsonwebtoken');
require('dotenv').config


const login = (req, res) => {

    const { email, password } = req.body
    

    // Cheking up if email exists in the database
    knexApp('users')
        .select('*')
        .where({ email: email })
        .then(resMysql => {
            if (resMysql.length === 0) res.status(400).send('Sorry this email is not in our database !');

            // Checking if the email belongs to the user
            bycriptjs.compare(password, resMysql[0].password, (err,resHash)=>{
                if(resHash) {
                    
                    const token = jwt.sign({id:resMysql[0].idusers}, process.env.TOKEN_KEY,{
                        //expiresIn:86400,
                        expiresIn:60
                    });
                    res.send(token);
                }
                else res.send('Sorry this is not the password for '+ resMysql[0].email)
            })

        })
        .catch(errMysql => res.status(400).send(errMysql));

}


module.exports = {
    login
}