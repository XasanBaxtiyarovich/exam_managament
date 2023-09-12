const Joi = require("joi");

const Group = require("../models/group.model");
const CustomError = require("../utils/custom-error");

const createGroup = async(req, res, next) => {
    try {
        const {group_name, group_description} = req.body;

        const schema = Joi.object({
            group_name: Joi.string().required(),
            group_description: Joi.string().required()
        });
        const {error} = schema.validate({ group_name, group_description });
      
        if (error) return res.status(400).json({message: error.message});

        const [group] = await Group.findAll({where: {group_name}});
        if(group) throw new CustomError(409, 'Group name already exists');

        const newGroup = await Group.create({group_name, group_description});

        res.status(201).json({message: "Success", newGroup: newGroup});
    } catch (error) {
        next(error);
    }
};

const getGroups = async(req, res, next) => {
    try {
        const groups = await Group.findAll();

        res.status(201).json({message: "Success", Groups: groups});
    } catch (error) {
        next(error);
    }
};

const getGroup = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [group] = await Group.findAll({where: {id}});
        if(!group) throw new CustomError(404, 'Group Not Found');

        res.status(203).json({message: "Success", Group: group});
    } catch (error) {
        next(error);
    }
};

const updateGroup = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {group_name, group_description} = req.body;

        const schema = Joi.object({
            group_name: Joi.string().required(),
            group_description: Joi.string().required()
        });
        const {error} = schema.validate({ group_name, group_description });
      
        if (error) return res.status(400).json({message: error.message});

        const [group] = await Group.findAll({where: {id}});
        if(!group) throw new CustomError(404, 'Group Not Found');

        const [data] = await Group.findAll({where: {group_name}});
        if(data) throw new CustomError(400, 'There is a group with that name');

        await Group.update({group_name, group_description}, {where: {id}});
      
        res.status(201).json({message: "Success"});
    } catch (error) {
        next(error);
    }
};

const deleteGroup = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [group] = await Group.findAll({where: {id}});
        if(!group) throw new CustomError(404, 'Group Not Found');

        await Group.destroy({where: {id}});

        res.json({message: "Success"});
    } catch (error) {
        next(error);
    }
};

module.exports = {createGroup, getGroups, getGroup, updateGroup, deleteGroup};