const Joi = require("joi");

const User = require("../models/user.model");
const Group = require("../models/group.model");
const User_Groups = require("../models/user-groups.model");
const CustomError = require("../utils/custom-error");

const createUserGrops = async(req, res, next) => {
    try {
        const {user_name, group_name} = req.body;

        const schema = Joi.object({
            group_name: Joi.string().required(),
            user_name: Joi.string().required()
        });
        const {error} = schema.validate({ group_name, user_name });
      
        if (error) return res.status(400).json({message: error.message});

        const [user] = await User.findAll({where: {user_name}});
        if(!user) throw new CustomError(404, 'User Not Found');

        const [group] = await Group.findAll({where: {group_name}});
        if(!group) throw new CustomError(409, 'Group Not Found');

        const [userGroup] = await User_Groups.findAll({where: {user_id: user.id, group_id: group.id}});
        if(userGroup) throw new CustomError(400, 'The user exists in the group');

        const newUserGrops = await User_Groups.create({user_id: user.id, group_id: group.id});

        res.json({message: "Success"});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getUserGrops = async(req, res, next) => {
    try {
        const userGrops = await User_Groups.findAll({include: [{model: User}, {model: Group}], attributes: {exclude: ["user_id", "group_id"]}});

        res.json({message: "Success", userGrops: userGrops});
    } catch (error) {
        next(error);
    }
};

const getOneUserGrops = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [userGrops] = await User_Groups.findAll({where: {id}, include: [{model: User}, {model: Group}], attributes: {exclude: ["user_id", "group_id"]}});
        if(!userGrops) throw new CustomError(404, 'User grops not found');

        res.json({message: "Success", userGrops: userGrops});     
    } catch (error) {
        next(error);
    }
};

const deleteUserGrops = async(req, res, next) => {
    try {
        const {id} = req.params;

        const userGrops = await User_Groups.findAll({where: {id}});
        if(!userGrops) throw new CustomError(404, 'User grops not found');

        await User_Groups.destroy({where: {id}});

        res.json({message: "Success"});  
    } catch (error) {
        next(error);
    }
};

module.exports = {createUserGrops, getOneUserGrops, getUserGrops, deleteUserGrops};