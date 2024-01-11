const { getAllTasksDB, createTaskDB, getTaskByIdDB, updateTaskDB, deleteTaskDB, patchTaskDB } = require("../repository/task.repository");

const getAllTasks = async () => {
  const data = await getAllTasksDB();
  if (!data.length) throw new Error('empty list');
  return data;
};
const createTask = async (task, user_id) => {
  const data = await createTaskDB(task, user_id);
  if (!data.length) throw new Error('empty data');
  return data;
};
const getTaskById = async (id) => {
  const data = await getTaskByIdDB(id);
  if (!data.length) throw new Error('empty data');
  return data;
};
const updateTask = async (id, task, user_id) => {
  const data = await updateTaskDB(id, task, user_id);
  if (!data.length) throw new Error('empty data');

  return data;

};

const deleteTask = async (id) => {
  const data = await deleteTaskDB(id);
  if (!data.length) throw new Error('invalid delete data');
  return data;
};
const patchTask = async (id, body) => {
  const data = await patchTaskDB(id, body);
  if (!data.length) throw new Error('invalid data');
  return data;
};
module.exports = { getAllTasks, createTask, getTaskById, updateTask, deleteTask, patchTask };