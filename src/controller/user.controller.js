const { getAllData, getDataById, createUser, updateUser, deleteUser } = require('../service/user.service');
const { buildResponse } = require('../helper/buildResponse');
const { isValidId } = require('../helper/validation');
const route = require('express').Router();

route.get('/', async (_req, res) => {
  try {
    const data = await getAllData();

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});
route.get('/:id', isValidId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDataById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }

});
route.post('/', async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await createUser(name, surname, email, pwd);
    buildResponse(res, 200, data);
  } catch (er) {
    buildResponse(res, 404, er.message);
  }
});
route.put('/:id', isValidId, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, pwd } = req.body;
    const data = await updateUser(id, name, surname, email, pwd);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});
route.delete('/:id', isValidId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }

});
module.exports = route;