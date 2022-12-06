const express = require('express');
const { CreateUser, Login, Protected, getUserData } = require('../Controllers/UserControls');
const authRouter = express.Router();


authRouter.post('/sineup', CreateUser);
authRouter.post('/login', Login);
authRouter.get('/', Protected, getUserData)


module.exports = authRouter;

