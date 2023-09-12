const Joi = require("joi");

const Exam = require("../models/exam.model");
const Group = require("../models/group.model");
const CustomError = require("../utils/custom-error");

const createExam = async(req, res, next) => {
    try {
        const {group_id, passing_score, deadline} = req.body;

        const schema = Joi.object({
            group_id: Joi.number().required(),
            passing_score: Joi.number().required(),
            deadline: Joi.required()
        });
        const {error} = schema.validate({ group_id, passing_score, deadline });
      
        if (error) return res.status(400).json({message: error.message});

        const [group] = await Group.findAll({where: {id: group_id}});
        if(!group) throw new CustomError(404, 'Group Not Found');

        const exam = await Exam.create({group_id, passing_score, deadline});

        res.json({message: "Success", Exam: exam}); 
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getExams = async(req, res, next) => {
    try {
        const exams = await Exam.findAll({include: [{model: Group}], attributes: {exclude: ["group_id"]}});

        res.json({message: "Success", Exams: exams});
    } catch (error) {
        next(error);
    }
};

const getExam = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [exam] = await Exam.findAll({where: {id}, include: [{model: Group}], attributes: {exclude: ["group_id"]}});
        if(!exam) throw new CustomError(404, 'Exam Not Found');

        res.json({message: "Success", Exam: exam});
    } catch (error) {
        next(error);
    }
};

const updateExam = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {group_id, passing_score, deadline} = req.body;

        const schema = Joi.object({
            group_id: Joi.number().required(),
            passing_score: Joi.number().required(),
            deadline: Joi.required()
        });
        const {error} = schema.validate({ group_id, passing_score, deadline });
      
        if (error) return res.status(400).json({message: error.message});

        const [exam] = await Exam.findAll({where: {id}});
        if(!exam) throw new CustomError(404, 'Exam Not Found');

        const [group] = await Group.findAll({where: {id: group_id}});
        if(!group) throw new CustomError(404, 'Group Not Found');

        await Exam.update({group_id, passing_score, deadline}, {where: {id}});
      
        res.status(201).json({message: "Success"});
    } catch (error) {
        next(error);
    }
};

const deleteExam = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [exam] = await Exam.findAll({where: {id}});
        if(!exam) throw new CustomError(404, 'Exam Not Found');
        
        await Exam.destroy({where: {id}});

        res.json({message: "Success"});
    } catch (error) {
        next(error);
    }
};

module.exports = {createExam, getExam, getExams, updateExam, deleteExam};