const express = require('express');
const User = require('../../models/user');

const router = new express.Router();

//  @route GET api/users
// @desc get All users
// @access Public
// router.get('/', async (req, res) => {
//   res.send('register');
// });

//  @route POST api/users
// @desc create and auth a user
// @access Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(406).json({ msg: 'Please enter all fiields' });
    // return new Error({ msg: 'Please enter all fiields' });
  }
  const registeredUsers = await User.findOne({ email });
  if (registeredUsers) {
    return res.status(409).json({ msg: 'user already exist' });
  }
  const user = new User({ name, email, password });
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ msg: 'Unable to register' });
  }
});

//  @route DELETE api/items
// @desc delete an item
// @access Public
router.delete('/:id', async (req, res) => {});

module.exports = router;
