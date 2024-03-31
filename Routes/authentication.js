const express = require("express");
const controller = require("./../Controller/authenticationController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: The login full name
 *         password:
 *           type: string
 *           description: The login password
 *         role:
 *           type: string
 *           description: The role of the user (e.g., admin, teacher, child)
 * 
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Incorrect email or password
 */

router.route("/login")
    .post(controller.login)

module.exports = router;
