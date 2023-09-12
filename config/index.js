require("dotenv/config");

const {env} = process;

const config = {
    port: env.PORT,
    sequelize_uri: env.SEQUELIZE_URI,
    jwtSecret: env.JWT_SECRET,
    expiresToken: env.EXPIRES_TOKEN,
};

module.exports = config;