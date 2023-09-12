const jwt = require("jsonwebtoken");
const config = require("../../config");

const secret = config.jwtSecret;
const expiresIn = config.expiresToken;

const sign = (payload) => jwt.sign(payload, secret, {expiresIn});
const verify = (payload, callback) => jwt.verify(payload, secret, callback);

module.exports = {
  sign,
  verify,
};