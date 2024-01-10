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

function checkerBody(body) {
  if ('name' in body) {
    if (!/^[a-zA-Z ]{2,}$/gm.test(body.name)) throw new Error('invalid name');
    if (/[ ]{2,}/gm.test(body.name)) throw new Error('multiply spaces');
    if (body.name.split(' ').length > 3) throw new Error('max 3 parts of name');
  }

  if ('surname' in body) {
    if (!/^[a-zA-Z]{2,}$/gm.test(body.surname)) throw new Error('invalid surname');
    if (body.surname.includes(' ')) throw new Error('The surname contains a space');
  }
  if ('email' in body) {
    if (!/^[\w]+\.[\w]+@[\w]{4,8}\.\w{2,4}$/gm.test(body.email)) throw new Error('invalid email');
  }
}

function isValidUserBody(req, _res, next) {
  checkerBody(req.body);
  next();
}
module.exports = { isValidId, isValidUserBody };