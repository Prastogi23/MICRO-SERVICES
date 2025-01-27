const jwt = require('jsonwebtoken');
const captionModel = require('../models/caption.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');

module.exports.captionAuth = async(req, res, next)=>{
    try {
        const token = req.cookies.Ctoken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if(!token || await blacklisttokenModel.findOne({token})){
            return res.status(401).json({message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        const caption  = await captionModel.findById(decoded.id);
        if (!caption) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        req.caption = caption;
        next();
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}