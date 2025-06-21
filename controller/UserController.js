const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/Config");
const UserController = {
 register:async(req,res)=>{
        try {
            const {name,password} = req.body;
            if(!name || !password){
                return res.status(404).json({message:"missing required fields"})
            }
            const user = await User.findOne({name});
            if(user){
                 return res.status(404).json({message:"user already exits"})
            }
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new User({
                name,
                password : hashedPassword,
            })
            const savedUser = await newUser.save();
            res.status(200).json({message:"user created successfully",savedUser})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },
   login: async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      
      {
         name: "Abimani" ,
        id: user._id,
      },
      config.Secret_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", 
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.status(200).json({ message: "User login successfully", token, user: {
    id: user._id,
    name: user.name,
  } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

}
module.exports = UserController;