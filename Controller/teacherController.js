const { request } = require("express");
const childSchema = require("../Model/ChildModel");
const teacherSchema=require("../Model/TeacherModel");
const bcrypt = require('bcrypt');
exports.getTeacherById = (req, res, next) => {
  teacherSchema.findOne({_id:req.params.id})
      .then((teacher) => {
          if (!teacher) {
              return res.status(404).json({ message: "Teacher not found" });
          }
          res.status(200).json({ teacher });
      })
      .catch((error) => next(error));
};
exports.getAllChildren = (req, res, next) => {
  childSchema.find()
    .then((children) => {
      res.status(200).json({ data: children });
    })
    .catch((error) => next(error));
};

exports.changePassword = async (req, res, next) => {
    const { id } = req.params;
    const {newPassword } = req.body;
    try {
        const teacher = await teacherSchema.findById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        teacher.password = hashedNewPassword;
        await teacher.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        next(error);
    }
};

