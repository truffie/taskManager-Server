const route = require('express').Router();
const { buildResponse } = require('../helper/buildResponse');
const { getAllTasks, createTask, getTaskById, updateTask, deleteTask, patchTask } = require('../service/task.service');
route.get('/', async (_req, res) => {
  try {

    const data = await getAllTasks();
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});
route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getTaskById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }

});
route.post('/', async (req, res) => {
  try {
    const { task, user_id } = req.body;
    const data = await createTask(task, user_id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});
route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, user_id } = req.body;
    const data = await updateTask(id, task, user_id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 200, error.message);
  }
});
route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteTask(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});
route.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await patchTask(id, body);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});
module.exports = route;