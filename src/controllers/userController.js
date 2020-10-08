require('dotenv').config();
const bcryptjs = require('bcryptjs');
const knexApp = require('../database/connection');


const listUsers = async (req, res) => {

    knexApp('users').select('*')
        .then(resmsql => res.send(resmsql))
        .catch(err => res.send(err))

}

const insertUser = async (req, res) => {

    const { password, email } = req.body;

    if (!email) return res.status(401).send('Sorry you need to write your email to continue');


    knexApp('users').where({ email: email })
        .then(mysqlres => {
            if (mysqlres.length !== 0) res.status(400)
                .send('Sorry this email already exists in our database');
        })
        .catch(error => res.status(400).send(error));

    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(password, salt, (err, salt) => {

            if (err) return console.log(err);
            req.body.password = salt

            knexApp('users').insert(req.body)
                .then(mysqlres => res.status(204).send(mysqlres))
                .catch(mysqlerror => res.status(400).send(mysqlerror))
        })
    });
}




module.exports = {
    listUsers,
    insertUser
}