const userModel = require('../models/user.model');

module.exports.createUser = async ({ fullName, email, password }) => {
  if (!fullName || !fullName.firstname || !fullName.lastname || !email || !password) {
    throw new Error('All fields are required');
  }

  const user = userModel.create({
    fullName: {
      firstname: fullName.firstname,
      lastname: fullName.lastname
    },
    email,
    password
  });

  return user;
};