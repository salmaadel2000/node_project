const express = require("express");
const controller = require("../Controller/childController");
const validationResult = require("../Midelwares/validations/validatorResult");
const authorization=require("../Midelwares/authenticationMw")


/**
 * @swagger
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: The child ID
 *         fullName:
 *           type: string
 *           description: The child's full name
 *         email:
 *           type: string
 *           description: The child's email
 *         password:
 *           type: string
 *           description: The child's password
 *         img:
 *           type: string
 *           description: URL of the child's image
 *       required:
 *         - fullName
 *         - email
 *         - password
 */

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get the child by ID
 *     tags: [Children]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The ID of the child to retrieve
 *     responses:
 *       200:
 *         description: The child data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       404:
 *         description: Child not found
 */

// Route Intialization //
const router = express.Router();
router.route("/child/:id")
  .get(authorization.ischild,validationResult,controller.getChildById)

module.exports = router;
