function checkerId(id) {
  if (typeof id != 'number' && typeof id != 'string') throw new Error(' type not valid');
  if (isNaN(id)) throw new Error('id not number');
  if (+id < 0) throw new Error('id must be a positive integer');
}

function isValidId(req, _res, next) {
  const { id } = req.params;
  checkerId(id);
  next();
}


module.exports = { isValidId };