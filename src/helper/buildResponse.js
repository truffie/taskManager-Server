const buildResponse = (res, number, data) => {
  res.status(number).send(data);
};

module.exports = { buildResponse };