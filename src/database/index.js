const {Sequelize} = require("sequelize");
const config = require("../../config");

const sequelize = new Sequelize(config.sequelize_uri);

module.exports = sequelize;