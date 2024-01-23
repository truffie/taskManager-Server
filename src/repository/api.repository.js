const pool = require('../db');

const createUserApiDB = async (body) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = "insert into users(name,surname,email,pwd) values($1,$2,$3,$4) returning *";
    const { rows } = await client.query(queryText, [body.name, body.surname, body.email, body.pwd]);
    await client.query("COMMIT");
    return rows;
  } catch (error) {

    await client.query("ROLLBACK");
    return [];
  }
};

const getUserByEmailDB = async (email) => {
  const client = await pool.connect();
  const queryText = "select * from users where email = $1";
  const { rows } = await client.query(queryText, [email]);
  return rows;
};


module.exports = { createUserApiDB, getUserByEmailDB };
