const { body, param, query } = require("express-validator");
exports.insertValidator = [
  body("_id").isInt().withMessage("Child id should be an integer"),
  body("fullName").isAlpha().withMessage("Child fullname should be a string").isLength({ min: 5 }),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 8 }).withMessage("Password should be at least 8 characters long"),
  body("img").isAlpha().withMessage("Child img should be a string"),

];
exports.updateValidator = [
  body("_id").isInt().withMessage("Child id should be an integer"),
  body("fullName").isAlpha().withMessage("Child fullname should be a string").isLength({ min: 5 }),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 8 }).withMessage("Password should be at least 8 characters long"),
  body("img").isAlpha().withMessage("Child img should be a string"),
];
exports.deleteValidator = [
  param('id').isInt().withMessage('ID must be an integer'),
];
