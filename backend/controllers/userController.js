const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/env');

exports.register = async (req, res, next) => {
  try {
    const { username, password, language } = req.body;
    const existing = await User.findOne({ username });

    if (existing) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, language });

    return res.status(201).json({
      id: user._id,
      username: user.username,
      language: user.language,
      is_expert: user.is_expert,
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username, is_expert: user.is_expert }, jwtSecret, {
      expiresIn: '1d',
    });

    return res.json({ token });
  } catch (error) {
    return next(error);
  }
};
