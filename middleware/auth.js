const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'Authorization failed' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: decoded._id });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Authorization failed' });
  }
};

module.exports = auth;
