const Joi = require("joi");
const bcrypt = require("bcrypt");

const { sign } = require("../utils/jwt");
const User = require("../models/user.model");
const CustomError = require("../utils/custom-error");

const createUser = async(req, res, next) => {
    try {
        const {first_name, last_name, user_name, password} = req.body;

        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            user_name: Joi.string().required(),
            password: Joi.string().min(6).required()
        });
        const {error} = schema.validate({ first_name, last_name, user_name, password });
      
        if (error) return res.status(400).json({message: error.message});

        const [user] = await User.findAll({where: {user_name}});

        if(user) throw new CustomError(409, 'User name already exists');

        const hashedPass = await bcrypt.hash(password, 12);

        const newUser = await User.create({first_name, last_name, user_name, password: hashedPass});

        res.status(201).json({message: "Success", newUser: newUser});
    } catch (error) {
        next(error)
    }
};

const getUsers = async(req, res, next) => {
    try {
        const users = await User.findAll({where: {is_admin: false}});

        res.status(201).json({message: "Success", Users: users});
    } catch (error) {
        next(error)
    }
};

const getUser = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [user] = await User.findAll({where: {id}});
        if(!user) throw new CustomError(404, 'User Not Found');

        res.status(203).json({message: "Success", user: user});
    } catch (error) {
        next(error)
    }
};

const updateUser = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {first_name, last_name, user_name} = req.body;

        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            user_name: Joi.string().required()
        });
        const {error} = schema.validate({ first_name, last_name, user_name });
      
        if (error) return res.status(400).json({message: error.message});

        const [user] = await User.findAll({where: {id}});
        if(!user) throw new CustomError(404, 'User Not Found');

        const [data] = await User.findAll({where: {user_name}});
        if(data) throw new CustomError(400, 'There is a user with that name');

        await User.update({first_name, last_name, user_name}, {where: {id}});

        res.status(201).json({message: "Success"});
    } catch (error) {
        next(error)
    }
};

const updatePassword = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {password} = req.body;

        const schema = Joi.object({
            password: Joi.string().min(6).required()
        });
        const {error} = schema.validate({ password });
      
        if (error) return res.status(400).json({message: error.message});

        const [user] = await User.findAll({where: {id}});
        if(!user) throw new CustomError(404, 'User Not Found');

        const hashedPass = bcrypt.hash(password, 12);

        await User.update({password: hashedPass}, {where: {id}});

        res.status(201).json({message: "Success"});
    } catch (error) {
        next(error);
    }
};

const deleteUser = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [user] = await User.findAll({where: {id}});
        if(!user) throw new CustomError(404, 'User Not Found');
        
        await User.destroy({where: {id}});

        res.json({message: "Success"});
    } catch (error) {
        next(error)
    }
};

const userLogin = async(req, res, next) =>{
    try {
        const {user_name, password} = req.body;
        
        const [{dataValues}] = await User.findAll({where: {user_name}});
        
        if(!dataValues) throw new CustomError(404, 'User Not Found');

        const pass = bcrypt.compare(password, dataValues.password);

        if(!dataValues) throw new CustomError(40, 'Invalid Password');

        console.log(dataValues);
        const token = sign({id: dataValues.id});

        res.json({message: "Success", token: token});
    } catch (error) {
        console.log(error);
        next(error)
    }
};


module.exports = {createUser, getUsers, getUser, updateUser, updatePassword, deleteUser, userLogin};