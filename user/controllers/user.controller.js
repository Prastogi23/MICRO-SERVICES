const userModel = require('../models/user.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.register = async (req , res) =>{
    try {
      const {name, email, password } = req.body;
      const user = await userModel.findOne({email});
      
      if(user){
        return res.status(400).json({ message: 'User already registered!'});
      }

      const hash = await bcrypt.hash(password, 10);
      const newUser = new userModel({name , email, password: hash});
      await newUser.save();

      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'} );
      delete newUser._doc.password;
      res.cookie('token', token);
      res.send({ token, newUser ,message: 'User registered succesfully'});
    } catch(error){
        res.status(500).json({ message: error.message});
   }
}

module.exports.login = async (req , res) => {
  try {
     const {  email , password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
      return res.status(400).json({message: 'User not found.'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
    delete user._doc.password;
    res.cookie('token',token);
    res.send({message: 'User logged in successfuly', token , user});

  } catch (error) {
    res.status(500).json({message:error.message });
  }  
}

module.exports.logOut = async(req , res)=>{
  try {
      const token = req.cookies.token;
      await blacklisttokenModel.create({token});
      res.clearCookie('token');
      res.send({ message: 'User logged out successfully' });
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.profile = async(req , res )=>{
  try {
    const user = req.user;
    // console.log(user.name);
    // const userProfile = {
    //   id : user._id,
    //   name : user.name,
    //   email : user.email
    // }
    res.send(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }}