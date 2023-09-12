const User = require("../models/user.model");

const isAdmin = async (req, res, next) => {
    const id = req.idUser;

    const {dataValues} = await User.findByPk(id);

    if(dataValues.is_admin == false) return res.status(403).json({message: "Unauthorized"});

    next();
};

module.exports = isAdmin;