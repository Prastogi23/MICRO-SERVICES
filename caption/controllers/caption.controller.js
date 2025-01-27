const captionModel = require('../models/caption.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.register = async (req , res) =>{
    try {
      const {name, email, password } = req.body;
      const caption = await captionModel.findOne({email});
      
      if(caption){
        return res.status(400).json({ message: 'caption already registered!'});
      }

      const hash = await bcrypt.hash(password, 10);
      const newcaption = new captionModel({name , email, password: hash});
      await newcaption.save();

      const token = jwt.sign({id: newcaption._id}, process.env.JWT_SECRET, {expiresIn: '1h'} );
      delete newcaption._doc.password;
      res.cookie('Ctoken', token);
      res.send({ token, newcaption ,message: 'caption registered succesfully'});
    } catch(error){
        res.status(500).json({ message: error.message});
   }
}

module.exports.login = async (req , res) => {
  try {
    const {  email , password} = req.body;

    const caption = await captionModel.findOne({email}).select('+password');

    if(!caption)
    {
      return res.status(400).json({message: 'caption not found.'});
    }    
    const isMatch = await bcrypt.compare(password, caption.password);

    if(!isMatch){
      return res.status(400).json({message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: caption._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
    delete caption._doc.password;
    res.cookie('Ctoken',token);
    res.send({message: 'caption logged in successfuly', token , caption});

  } catch (error) {
    res.status(500).json({message:error.message });
  }  
}

module.exports.logOut = async(req , res)=>{
  try {
      const token = req.cookies.Ctoken;
      await blacklisttokenModel.create({token});
      res.clearCookie('Ctoken');
      res.send({ message: 'caption logged out successfully' });
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.profile = async(req , res )=>{
  try {
    const caption = req.caption;
    res.send(caption);
  } catch (error) {
    res.status(500).json({message: error.message});
  }}

  module.exports.toggleAvailablity = async(req , res) =>{
    try {
      const caption = await captionModel.findOne(req.caption._id);
      caption.isAvailable = !caption.isAvailable;
      await caption.save();
      res.send(caption);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }