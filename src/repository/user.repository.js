const pool = require('../db');


const getAllDataDB = async () => {
  const client = await pool.connect();
  const queryText = 'SELECT * FROM users';
  const { rows } = await client.query(queryText);
  return rows;
};
const getDataByIdDB = async (id) => {
  const client = await pool.connect();
  const queryText = 'SELECT * FROM users where id = $1';
  const { rows } = await client.query(queryText, [id]);
  return rows;
};

const getUserByEmailDB = async (email) => {
  const client = await pool.connect();
  const queryText = 'SELECT * FROM users where email = $1';
  const { rows } = await client.query(queryText, [email]);
  return rows;
};

const createUserDB = async (name, surname, email, pwd) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO users(name,surname,email,pwd) values($1,$2,$3,$4) returning *';
    const { rows } = await client.query(queryText, [name, surname, email, pwd]);
    await client.query('COMMIT');
    return rows;
  } catch (er) {
    await client.query('ROLLBACK');
    console.log(`createUserDB: ${er.message}`);
  }

};


const updateUserDB = async (id, name, surname, email, pwd) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'update users set name = $1,surname = $2, email = $3, pwd = $4 where id = $5 returning *';
    const { rows } = await client.query(queryText, [name, surname, email, pwd, id]);
    await client.query('COMMIT');
    return rows;
  }
  catch (error) {
    await client.query('ROLLBACK');
    console.log(`updateUserDB: ${error.message}`);
  }
};

const deleteUserByIdDB = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('begin');

    const queryText = 'delete from users where id = $1 returning *';
    const { rows } = await client.query(queryText, [id]);
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(`deleteUserByIdDB ${error.message}`);
  }
};

module.exports = { getAllDataDB, getDataByIdDB, createUserDB, updateUserDB, getUserByEmailDB, deleteUserByIdDB };