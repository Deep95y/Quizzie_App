// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');

router.get('/datas', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const newUser = await User.create({ name, email, password, confirmPassword });
    res.json({ status: 'SUCCESS' });
  } catch (error) {
    res.status(500).json({ status: 'FAILED', message: 'Something went wrong!' });
  }
});

module.exports = router;
