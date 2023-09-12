const config = require("../../config");
const sequelize = require("../database");

const run = async(app) => {
    await sequelize.authenticate({
        logging: false,
    });
    
    await sequelize.sync({
        logging: false,
        alter: true,
    });

    app.listen(config.port, () => {
        console.log(`Server listening on port: ${config.port}`);
    });
};

module.exports = run;