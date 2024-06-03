// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ status: "User with this email exists, please login" });
    }

    const encryptedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: encryptedPass,
      confirmPassword
    });

    res.json({ status: "SUCCESS" });
  } catch (error) {
    res.status(500).json({ status: "FAILED", message: "Something went wrong!" });
  }
});

router.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: 'User with this email does not exist! Please signup' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ status: "Incorrect credentials" });
    }

    const jwToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '10h' });  
    return res.json({ status: "Login successful", jwToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED", message: "Something went wrong!" });
  }
});

module.exports = router;
