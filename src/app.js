const app = require('express')();
const bp = require('body-parser');
const routeUser = require('./controller/user.controller');
const routeTask = require('./controller/task.controller');
const routeApi = require('./controller/api.controller');

app.use(bp.json());

app.use('/user', routeUser);
app.use('/tasks', routeTask);
app.use('/api', routeApi);

app.use((error, _req, res, _next) => {
  res.status(500).send(error.message);
});

module.exports = app;