const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');

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
