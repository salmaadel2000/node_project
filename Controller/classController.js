const bcrypt = require('bcrypt');
const Class = require("../Model/ClassModel");
const teacherSchema=require("../Model/TeacherModel");
const childSchema = require("../Model/ChildModel");
const mongoose = require("mongoose");
const hashPassword = async (password) => {
  try {
      const hashedPassword = await bcrypt.hash(password, 10); 
      return hashedPassword;
  } catch (error) {
      throw error;
  }
};
exports.getAllClasses = (req, res, next) => {
  Class.find()
      .populate({
          path: 'student', 
          select: {fullName:1}
      })
      .populate({
        path: 'supervisor', 
        select: {email:1,img:1}
    })
      .then((classes) => {
          res.status(200).json({ data: classes });
      })
      .catch((error) => next(error));
};

exports.getClassById = (req, res, next) => {
    const classId = req.params.id;
    Class.findById(classId)
        .then((classObj) => {
            if (!classObj) {
                return res.status(404).json({ message: "Class not found" });
            }
            res.status(200).json({ data: classObj });
        })
        .catch((error) => next(error));
};
exports.addNewClass = async (req, res, next) => {
  const { _id,fullName, supervisor, student } = req.body;
  if (!mongoose.Types.ObjectId.isValid(supervisor)) {
      return res.status(400).json({ message: 'Invalid supervisor ID' });
  }
  if (!Array.isArray(student) || student.some(id => typeof id !== 'number' || !Number.isInteger(id))) {
      return res.status(400).json({ message: 'Invalid student IDs' });
  }

  try {
      const foundSupervisor = await teacherSchema.findById(supervisor);
      if (!foundSupervisor) {
          return res.status(404).json({ message: 'Supervisor not found' });
      }
      const invalidStudentIds = [];
      for (const studentId of student) {
          const foundChild = await childSchema.findById(studentId);
          if (!foundChild) {
              invalidStudentIds.push(studentId);
          }
      }
      if (invalidStudentIds.length > 0) {
          return res.status(404).json({ message: `Child with ID ${invalidStudentIds.join(',')} not found` });
      }      
      const newClass = new Class({
        _id,
          fullName,
          supervisor,
          student
      });

      const savedClass = await newClass.save();
      res.status(200).json({ data: savedClass });
  } catch (error) {
      next(error);
  }
};

exports.updateClass = (req, res, next) => {
    const classId = req.params.id;
    Class.findByIdAndUpdate(classId, req.body, { new: true })
        .then((classObj) => {
            if (!classObj) {
                return res.status(404).json({ message: "Class not found" });
            }
            res.status(200).json({ data: classObj });
        })
        .catch((error) => next(error));
};

exports.deleteClass = (req, res, next) => {
    const classId = req.params.id;
    Class.findByIdAndDelete(classId)
        .then((classObj) => {
            if (!classObj) {
                return res.status(404).json({ message: "Class not found" });
            }
            res.status(200).json({ message: `Deleted class with ID: ${classId}` });
        })
        .catch((error) => next(error));
};

exports.getChildInfo = (req, res, next) => {
  const childId = req.params.id;
  try {
    if (!Number(childId)) {
      return res.status(400).json({ message: 'Invalid child ID' });
    }
    childSchema.findById(childId)
      .then((child) => {
        if (!child) {
          return res.status(404).json({ message: 'Child not found' });
        }
        Class.find({ student: childId })
          .then((classes) => {
            res.status(200).json({ child});
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

exports.getSupervisorInfo = (request, response, next) => {
  const teacherId = request.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return response.status(400).json({ message: 'Invalid teacher ID' });
    }
    teacherSchema.findById(teacherId)
      .then((teacher) => {
        if (!teacher) {
          return response.status(404).json({ message: 'Teacher not found' });
        }
        Class.find({ teacher: teacherId })
          .then((classes) => {
            response.status(200).json({ teacher });
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
};

exports.getAllTeachers = (req, res, next) => {
  teacherSchema.find()
    .then((teachers) => {
      res.status(200).json({ data: teachers });
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

exports.deleteTeacher = (req, res, next) => {
  const teacherId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    return res.status(400).json({ message: 'Invalid teacher ID' });
  }
  Class.updateMany({ teacher: teacherId }, { $unset: { teacher: "" } })
    .then(() => {
      return teacherSchema.findByIdAndDelete(teacherId);
    })
    .then((deletedTeacher) => {
      if (!deletedTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json({ message: `Deleted teacher with ID: ${teacherId}` });
    })
    .catch((error) => next(error));
};


exports.deleteChild = (req, res, next) => {
  const childId = req.params.id;

  Class.updateMany({ student: childId }, { $pull: { student: childId } })
    .then(() => {
      return childSchema.deleteOne({ _id: childId });
    })
    .then((deletedChild) => {
      if (!deletedChild) {
        return res.status(404).json({ message: 'Child not found' });
      }
      res.status(200).json({ message: `Deleted child with ID: ${childId}` });
    })
    .catch((error) => next(error));
};



exports.insertTeacher = async (req, res, next) => {
  if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
  }

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'fullName, email, and password are required fields' });
  }

  try {
      const hashedPassword = await hashPassword(password); 
      const imgFilename = req.file.filename; 

      const teacher = new teacherSchema({
          fullName: fullName,
          email: email,
          password: hashedPassword,
          img: imgFilename
      });

      const savedTeacher = await teacher.save();
      res.status(200).json({ data: savedTeacher });
  } catch (error) {
      next(error);
  }
};
exports.updateTeacher = async (req, res, next) => {
  const teacherId = req.params.id;
  const updates = req.body;

  try {
      if (updates.password) {
          updates.password = await hashPassword(updates.password); 
      }

      const updatedTeacher = await teacherSchema.findByIdAndUpdate(teacherId, updates, { new: true });
      if (!updatedTeacher) {
          return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json({ data: updatedTeacher });
  } catch (error) {
      next(error);
  }
}
exports.insertChild = async (req, res, next) => {
  if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
  }

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'fullName, email, and password are required fields' });
  }

  try {
      
      const hashedPassword = await hashPassword(password);
      const imgFilename = req.file.filename; 
      const child = new childSchema({
          fullName: fullName,
          email: email,
          password: hashedPassword,
          img: imgFilename
      });
      const savedChild = await child.save();
      res.status(200).json({ data: savedChild });
  } catch (error) {
      if (error.code === 11000) {
          res.status(409).json({ error: "Email already exists" });
      } else {
          next(error);
      }
  }
};

exports.updateChild = async (req, res, next) => {
  const childId = req.params.id;
  const updates = req.body;

  try {
      if (updates.password) {
          updates.password = await hashPassword(updates.password); 
      }
      const updatedChild = await Child.findByIdAndUpdate(childId, updates, { new: true });
      if (!updatedChild) {
          return res.status(404).json({ message: 'Child not found' });
      }
      res.status(200).json({ data: updatedChild });
  } catch (error) {
      next(error);
  }
};