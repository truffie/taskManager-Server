const pool = require('../db');

const getAllTasksDB = async () => {
  const client = await pool.connect();
  const queryText = 'SELECT * FROM tasks';
  const { rows } = await client.query(queryText);
  return rows;
};
const getTaskByIdDB = async (id) => {
  const client = await pool.connect();
  const queryText = 'select * from tasks where id = $1';
  const { rows } = await client.query(queryText, [id]);
  return rows;
};
const createTaskDB = async (task, user_id) => {
  const client = await pool.connect();
  try {
    client.query('BEGIN');
    const queryText = 'INSERT INTO tasks(task,user_id) values($1,$2) returning *';
    const { rows } = await client.query(queryText, [task, user_id]);
    await client.query('COMMIT');
    return rows;
  }

  catch (error) {
    await client.query('ROLLBACK');
    console.log(`createTaskDB ${error.message}`);
    return [];

  }
};
const updateTaskDB = async (id, task, user_id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'UPDATE tasks SET task = $1, user_id = $2 where id = $3 returning *';
    const { rows } = await client.query(queryText, [task, user_id, id]);
    await client.query('COMMIT');
    return rows;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`updateTaskDB: ${error.message}`);
    return [];

  }
};

const deleteTaskDB = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'delete from tasks where id = $1 returning *';
    const { rows } = await client.query(queryText, [id]);
    await client.query('COMMIT');
    return rows;

  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`deleteTaskDB ${error.message}`);
    return [];
  }
};
const patchTaskDB = async (id, body) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryOldTask = 'SELECT * FROM tasks where id = $1';
    const { rows: old } = await client.query(queryOldTask, [id]);
    const patchedTask =  { ...old[0], ...body };
    const queryText = 'UPDATE tasks set task = $1, user_id = $2 where id = $3 returning *';
    const { rows: patchedRows } = await client.query(queryText, [patchedTask.task, patchedTask.user_id, id]);
    await client.query('COMMIT');
    return patchedRows;

  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`patchTaskDB ${error.message}`);
    return [];

  }
};
module.exports = { getAllTasksDB, deleteTaskDB, createTaskDB, getTaskByIdDB, updateTaskDB, patchTaskDB };