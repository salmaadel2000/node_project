const { body, param, query } = require("express-validator");

exports.insertValidator = [
  body("fullName")
    .isAlpha()
    .withMessage("teacher fullname should be a string")
    .isLength({ min: 5 }),
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
  body("img")
    .isAlpha()
    .withMessage("teacher img should be a string"),
];

exports.updateValidator = [
  body("fullName")
    .optional()
    .isAlpha()
    .withMessage("teacher username should be a string")
    .isLength({ min: 5 }),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
];

exports.deleteValidator = [
  param('id').isMongoId().withMessage('ID must be a valid MongoDB ObjectId')
];
