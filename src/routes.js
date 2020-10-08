const express = require('express');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const authController = require('./controllers/authController');
const loggedController = require('./controllers/loggedController');

const routes = express.Router()

routes.get('/', (req,res)=> res.send('you are on Moblex Backend !'))

//USER AUTHENTICATION 

routes.post('/login', loginController.login);
routes.get('/auth', authController.auth);


// USER CONTROLLERS
routes.get('/user',userController.listUsers);
routes.post('/user', userController.insertUser);

//LOGGED PAGE

routes.get('/loggedPainnel', authController.auth ,loggedController.loggedPainnel);







module.exports = routes;