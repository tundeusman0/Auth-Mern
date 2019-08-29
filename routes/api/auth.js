const express = require('express');
const User = require('../../models/user');
const auth = require('../../middleware/auth');

const router = new express.Router();

//  @route POST api/auth
// @desc auth user
// @access Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(406).json({ msg: 'Please enter all fiields' });
  }
  const isUser = await User.findOne({ email });
  if (!isUser) {
    return res.status(409).json({ msg: 'user does not exist' });
  }
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ msg: 'Invalid Credentials' });
  }
});

//  @route GET api/auth
// @desc get a user data
// @access Private
router.get('/user', auth, async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
