const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

//controller action perform the logic of the route and call the service function to perform the database operation and return the response to the client

module.exports.registerUser = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
  fullName: {
    firstname: fullName.firstname,
    lastname: fullName.lastname
  },
  email,
  password: hashedPassword
});

  const token = user.generateAuthToken();

  res.status(201).json({ user, token });
}


module.exports.loginUser = async (req, res) => {

  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body; 
  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = user.generateAuthToken();

  res.cookie('token', token);
  res.status(200).json({ user, token });
}

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user );
}

module.exports.logoutUser = async (req, res) => {
  res.clearCookie('token');

  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  await blacklistTokenModel.create({ token });

  res.status(200).json({ message: 'Logged out successfully' });
}