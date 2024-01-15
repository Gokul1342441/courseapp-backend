// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcrypt');


router.get('/listUsers', async (req, res) => {
    try {
      const users = await User.find({}, 'firstname lastname email');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/listUserwithDetails', async (req, res) => {
    try {
      const users = await User.find({}, '-password');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.put('/editUser/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { firstname, lastname, email, phonenumber, password, confirmPassword } = req.body;
      if (password && password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.firstname = firstname || user.firstname;
      user.lastname = lastname || user.lastname;
      user.email = email || user.email;
      user.phonenumber = phonenumber || user.phonenumber;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      await user.save();
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // Delete User
  router.delete('/deleteUser/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await User.findOneAndDelete({ _id: userId });
  
      if (!result) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  // Create User
  router.post('/createUser', async (req, res) => {
    try {
      const { firstname, lastname, email, phonenumber, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstname,
        lastname,
        email,
        phonenumber,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);

      // Error Handle
      if (error.code === 11000 && error.keyPattern.email) {
        return res.status(400).json({ error: 'Email must be unique' });
      }
      if (error.code === 11000 && error.keyPattern.phonenumber) {
        return res.status(400).json({ error: 'Phone number must be unique' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Login User
  router.post('/loginUser', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;