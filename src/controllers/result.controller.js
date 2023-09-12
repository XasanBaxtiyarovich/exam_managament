const Joi = require("joi");

const Exam = require("../models/exam.model");
const Result = require("../models/result.model");
const User = require("../models/user.model");
const CustomError = require("../utils/custom-error");

const createResult = async(req, res, next) => {
    try {
        const {exam_id, user_id, ball} = req.body;

        const schema = Joi.object({
            exam_id: Joi.number().required(),
            user_id: Joi.number().required(),
            ball: Joi.number().required(),
        });
        const {error} = schema.validate({ exam_id, user_id, ball });
      
        if (error) return res.status(400).json({message: error.message});
        
        let newBall = ball;

        var [{dataValues}] = await Exam.findAll({where: {id: exam_id}});
        const exam = dataValues;
        if(!exam) throw new CustomError(404, 'Exam Not Found');

        var [{dataValues}] = await User.findAll({where: {id: user_id}});
        const user = dataValues;
        if(!user) throw new CustomError(404, 'User Not Found');

        var [result_exam] = await Result.findAll({where: {exam_id, user_id}});
        if(result_exam) throw new CustomError(400, 'Multiple uploads are not allowed');

        let time = Math.floor((new Date() - new Date(exam.deadline)) / 1000 / 60);
        if(time > 0){
            time = Math.floor(time / 5);
            if(time > 0) newBall = newBall - (time * 5);
        };
        
        if(newBall < 0) newBall = 0;

        if(newBall < exam.passing_score) await User.update({exam_status: true}, {where: {id: user_id}});

        const result = await Result.create({exam_id, user_id, ball: newBall});

        res.json({message: 'Success', result: result});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getResults = async(req, res, next) => {
    try {
        const results = await Result.findAll({include: [{model: Exam}, {model: User}], attributes: {exclude: ['exam_id', 'user_id']}});

        res.status(201).json({message: 'Success', Results: results});
    } catch (error) {
        next(error);
    }
};

const getResult = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [result] = await Result.findAll({where: {id}, include: [{model: Exam}, {model: User}], attributes: {exclude: ['exam_id', 'user_id']}});
        if(!result) throw new CustomError(404, 'Result Not Found');

        res.json({message: 'Success', Result: result});
    } catch (error) {
        next(error);
    }
};

const updateResult = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {exam_id, user_id, ball} = req.body;

        var [{dataValues}] = await Exam.findAll({where: {id: exam_id}});
        const exam = dataValues;
        if(!exam) throw new CustomError(404, 'Exam Not Found');

        var [{dataValues}] = await User.findAll({where: {id: user_id}});
        const user = dataValues;
        if(!user) throw new CustomError(404, 'User Not Found');

        await Result.update({exam_id, user_id, ball}, {where: {id}});

        res.json({message: 'Success'});
    } catch (error) {
        next(error);
    }
};

const deleteResult = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [result] = await Result.findAll({where: {id}});
        if(!result) throw new CustomError(404, 'Result Not Found');

        await Result.destroy({where: {id}});

        res.json({message: "Success"});
    } catch (error) {
        next(error);
    }
};

module.exports = {createResult, getResults, getResult, updateResult, deleteResult};