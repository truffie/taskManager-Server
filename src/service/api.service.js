const { createUserApiDB, getUserByEmailDB } = require("../repository/api.repository");
const bcrypt = require('bcrypt');
const saltRound = 5;

const createUserApi = async (body) => {
  const userEmail = await getUserByEmailDB(body.email);
  if (userEmail.length) throw new Error('email already exists');
  bcrypt.hash(body.pwd, saltRound, (_error, hash) => {
    body.pwd = hash;
  });
  const [user] = await createUserApiDB(body);
  delete user.pwd;
  if (!user) throw new Error('invalid data');
  return user;
};

const authUserApi = async (email, pwd) => {
  const [user] = await getUserByEmailDB(email);
  if (!user) throw new Error('user not found');

  if (!(await bcrypt.compare(pwd, user.pwd))) throw new Error('wrong password');
  delete user.pwd;
  return user;
};

module.exports = { createUserApi, authUserApi };
