const { body, param, query} = require("express-validator");

exports.insertValidator = [
    body("_id")
        .isInt()
        .withMessage("ID should be an integer"),
    body("fullName")
        .isAlpha()
        .withMessage("Name should be a string"),
    body("supervisor")
        .isMongoId()
        .withMessage("Supervisor should be a valid MongoDB ID"),
    body("student")
        .isArray()
        .withMessage("Student should be an array of student IDs")
        .custom((value, { req }) => {
            if (!value.every(Number.isInteger)) {
                throw new Error('Each student ID should be an integer');
            }
            return true;
        })
];

exports.updateValidator = [
    body("_id")
        .optional()
        .isInt()
        .withMessage("ID should be an integer"),
    body("fullName")
        .optional()
        .isAlpha()
        .withMessage("Name should be a string"),
    body("supervisor")
        .optional()
        .isMongoId()
        .withMessage("Supervisor should be a valid MongoDB ID"),
    body("student")
        .optional()
        .isArray()
        .withMessage("Student should be an array of student IDs")
        .custom((value, { req }) => {
            if (!value.every(Number.isInteger)) {
                throw new Error('Each student ID should be an integer');
            }
            return true;
        })
];

exports.deleteValidator = [
    param('id')
        .isInt()
        .withMessage('ID must be an integer')
];
