require('dotenv').config();
const { Pool } = require('pg');

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const PORTDB = process.env.PORTDB;

const pool = new Pool({
  user: USER,
  port: PORTDB,
  password: PASSWORD,
  database: 'task_manager',
  host: 'localhost',

});

module.exports = pool;