const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const isAuth = require('../Middlewares/isAuth')
const router = express.Router();

//test
//http://localhost:5000/user/test
router.get("/test", (req, res) => {
  res.send("it is working");
});

// register a user
//http://localhost:5000/user/register

router.post("/register", async (req, res) => {
  //1 add a new user
  //retrieve user data

  const { userName, email, password, role } = req.body;
  try {
    // check if the email is reserved
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "this email is reserved" });
    }
    // create a hashed password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create the new user

    user = new User({userName,email, password:hashedPassword, role })

    // save the new user in the DB

    await user.save()
     // create a token
 const token = jwt.sign({userId: user._id},process.env.SECRET_PASS,{
  expiresIn: "7 days"
})

    // response 
    res.status(201).json({user, token})

  } catch (error) {
    res.status(500).json({message : error.message})
  }
});

//login
//http://localhost:5000/user/login

router.post('/login', async(req, res)=> {
  const {email, password} = req.body
 try {
  //check if the email exists in the DB
 let user = await User.findOne({email})
 if(!user) {
  return res.status(404).json({msg : "this email has no account"})
 }
 //verify password
 const isMatched = await bcrypt.compare(password, user.password)
 if(!isMatched) {
  return res.status(400).json({msg : 'bad credentials'})
 }
 // create a token
const token = jwt.sign({userId: user._id},process.env.SECRET_PASS,{
  expiresIn: "7 days"
})
// response 
res.status(200).json({user, token})
 } catch (error) {
  res.status(500).json({message : error.message})
 }
})

//getting the authentificated user
//http://localhost:5000/user/profile

router.get('/profile',isAuth ,async (req, res)=> {
try {
  const user = res.user
  res.status(200).json(user)
} catch (error) {
  res.status(500).json({message : error.message})
}})



module.exports = router;
