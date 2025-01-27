const express = require('express');
const authMiddleware = require('../middleware/authMiddleWare');
const router = express.Router();
const captionController = require('../controllers/caption.controller');

router.post('/register', captionController.register);
router.post('/login', captionController.login);
router.get('/logout', captionController.logOut);
router.get('/profile',authMiddleware.captionAuth,captionController.profile);
router.get('/',(req,res)=>{ res.send("connected")});
router.patch('/toogle-Availability',authMiddleware.captionAuth,captionController.toggleAvailablity);

module.exports = router;