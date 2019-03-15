const jwt = require("jsonwebtoken");
const config = require("./config.js");

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  } else {
    res.status(401);
    return res.end();
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401);
      return res.end();
    } else {
      console.log("Decoded token");
      console.log(decoded);
      req.decoded = decoded;
      next();
    }
  });
};

const sign = data => {
  let token = jwt.sign(data, config.secret, {
    expiresIn: "24h" // expires in 24 hours
  });
  return token;
};

module.exports = {
  checkToken,
  sign
};
