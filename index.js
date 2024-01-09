require('dotenv').config();
const app = require('./src/app');

const CLIENT = process.env.CLIENT;

app.listen(CLIENT, () => {
  console.log(`server is running on port: ${CLIENT}`);
});
