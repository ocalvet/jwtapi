const jwt = require('jsonwebtoken');
const config = require('./config.js');

const getTokenFromRequest = req => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  } else {
    throw new Error('Token not found');
  }
  return token;
};

const checkToken = (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401);
        return res.end();
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } catch (e) {
    res.status(401);
    return res.end();
  }
};

const sign = data => {
  let token = jwt.sign(data, config.secret, {
    expiresIn: '24h' // expires in 24 hours
  });
  return token;
};

module.exports = {
  checkToken,
  sign
};
