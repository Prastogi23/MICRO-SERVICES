const express = require('express');
const authMiddleware = require('../middleware/authMiddleWare');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logOut);
router.get('/profile',authMiddleware.userAuth,userController.profile);
router.get('/',(req,res)=>{ res.send("connected")});
module.exports = router;