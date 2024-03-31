const express = require("express");
const router = express.Router();
const controller = require("../Controller/teacherController");
const authorization = require("../Midelwares/authenticationMw");

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     summary: Get the teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the teacher to retrieve
 *     responses:
 *       200:
 *         description: The teacher data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teacher not found
 *   patch:
 *     summary: Change teacher's password
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the teacher whose password needs to be changed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the teacher
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       404:
 *         description: Teacher not found
 */
router.route("/teacher/:id")
  .all(authorization.isteacher)
  .get(controller.getTeacherById)
  .patch(controller.changePassword);

/**
 * @swagger
 * /teacher/children:
 *   get:
 *     summary: Get all children associated with the teacher
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: Children retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Child'
 *       404:
 *         description: No children found for the teacher
 */
router.get("/teacher/children", authorization.isteacher, controller.getAllChildren);

module.exports = router;
