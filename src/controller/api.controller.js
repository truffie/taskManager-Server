const route = require('express').Router();

const { buildResponse } = require('../helper/buildResponse');
const { createUserApi, authUserApi } = require('../service/api.service');


route.post('/reg', async (req, res) => {
  try {
    const body = req.body;
    const data = await createUserApi(body);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post('/auth', async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const data = await authUserApi(email, pwd );
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }


});

module.exports = route;