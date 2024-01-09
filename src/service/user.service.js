const { getAllDataDB, getDataByIdDB, createUserDB, updateUserDB, getUserByEmailDB, deleteUserByIdDB } = require("../repository/user.repository");

const getAllData = async () => {
  const data = await getAllDataDB();
  if (!data.length) throw new Error('miss database');
  return data;
};
const getDataById = async (id) => {
  const data = await getDataByIdDB(id);
  if (!data.length) throw new Error('data not found');
  return data;
};

const createUser = async (name, surname, email, pwd) => {
  const foundUser = await getUserByEmailDB(email);

  if (foundUser.length) throw new Error('email already exsist');

  const data = await createUserDB(name, surname, email, pwd);
  if (!data.length) throw new Error('data not saved');
  return data;
};

const updateUser = async (id, name, surname, email, pwd) => {


  const data = await updateUserDB(id, name, surname, email, pwd);

  if (!data.length) throw new Error('empty data');

  return data;
};

const deleteUser = async (id) => {
  const data = await deleteUserByIdDB(id);
  if (!data.length) throw new Error('user not found');
  return data;
};


module.exports = { getAllData, getDataById, createUser, updateUser,deleteUser };