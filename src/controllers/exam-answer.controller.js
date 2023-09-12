const Joi = require("joi");
const path = require("path");

const User = require("../models/user.model");
const Exam = require("../models/exam.model");
const CustomError = require("../utils/custom-error");
const Exam_answer = require("../models/exam-answer.model");
const User_Groups = require("../models/user-groups.model");

const createExamAnswer = async(req, res, next) => {
    try {
        const id = req.idUser
        const {exam_id } = req.body;
        const file = req.files?.file;

        const schema = Joi.object({
            exam_id: Joi.number().required()
        });
        const {error} = schema.validate({ exam_id });
      
        if (error) return res.status(400).json({message: error.message});
        
        const [{dataValues}] = await User.findAll({where: {id}});
        const user = dataValues;

        const [exam] = await Exam.findAll({where: {id: exam_id}});

        const [data] = await User_Groups.findAll({where: {user_id: user.id, group_id: exam.group_id}});
        if(!data) throw new CustomError(400, 'There is no such user in this group');
    
        const [exam_answer] = await Exam_answer.findAll({where: {exam_id, user_id: user.id}});
        if(exam_answer && user.is_admin == false) return res.status(400).json({message: 'A non-admin user cannot upload an exam answer more than once'});
    
        const mimetype = path.extname(file.name);
        const fileName = file.md5 + "_" + Date.now() + mimetype;
        file.mv(`${process.cwd()}/uploads/${fileName}`);
    
        const newExam_answer = await Exam_answer.create({exam_id, user_id: user.id, file_name: fileName});
    
        res.status(201).json({message: "Success", newAnswer: newExam_answer});
    } catch (error) {
        next(error);
    }
};

const getExamsAnsews = async(req, res, next) => {
    try {
        const exams_answers = await Exam_answer.findAll({include: [{model: User}, {model: Exam}], attributes: {exclude: ["user_id", "exam_id"]}});

        res.json({message: "Success", exam_answer: exams_answers});
    } catch (error) {
        next(error);
    }
};

const getExamAnswer = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [exam_answer] = await Exam_answer.findAll({where: {id}, include: [{model: User}, {model: Exam}], attributes: {exclude: ["user_id", "exam_id"]}});
        if(!exam_answer) throw new CustomError(404, 'Exam Answer Not Found');

        res.status(201).json({message: "Success", ExamAnswer: exam_answer});
    } catch (error) {
        next(error);
    }
};

const updateExamAnswer = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {exam_id, user_id } = req.body;
        const file = req.files?.file;
        
        const schema = Joi.object({
            exam_id: Joi.number().required()
        });
        const {error} = schema.validate({ exam_id });
      
        if (error) return res.status(400).json({message: error.message});

        const [exam_answer] = await Exam_answer.findAll({where: {id}});
        if(!exam_answer) throw new CustomError(404, 'Exam Answer Not Found');

        const [exam] = await Exam.findAll({where: {id: exam_id}});
        if(!exam) throw new CustomError(404, 'Exam Not Found');
        
        const mimetype = path.extname(file.name);
        const fileName = file.md5 + "_" + Date.now() + mimetype;
        file.mv(`${process.cwd()}/uploads/${fileName}`);

        await Exam_answer.update({exam_id, user_id, file_name: fileName}, {where: {id}});
      
        res.status(201).json({message: "Success" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteExamAnswer = async(req, res, next) => {
    try {
        const {id} = req.params;

        const [exam_answer] = await Exam_answer.findAll({where: {id}});
        if(!exam_answer) throw new CustomError(404, 'Exam Answer Not Found');

        await Exam_answer.destroy({where: {id}});

        res.json({message: "Success"});
    } catch (error) {
        next(error);
    }
};


module.exports = {createExamAnswer, getExamsAnsews, getExamAnswer, updateExamAnswer, deleteExamAnswer};