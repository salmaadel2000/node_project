const express = require("express");
const controller = require("../Controller/classController");
const upload = require("../Midelwares/imageValidation");
const validationResult = require("../Midelwares/validations/validatorResult");
const { insertValidator, updateValidator, deleteValidator } = require("../Midelwares/validations/classValidator");
const authorization=require("../Midelwares/authenticationMw")
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API endpoints for managing classes
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Retrieve all classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Class'
 *       401:
 *         description: Unauthorized
 */
router.route("/class")
  .all(authorization.isAdmin)
  .get(controller.getAllClasses)
  .post(insertValidator, validationResult, controller.addNewClass);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Retrieve a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Class not found
 *   delete:
 *     summary: Delete a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Class not found
 *   patch:
 *     summary: Update a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Class not found
 */
/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get child information by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Child ID
 *     responses:
 *       200:
 *         description: Child information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Child not found
 *   delete:
 *     summary: Delete child by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Child ID
 *     responses:
 *       200:
 *         description: Child deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Child not found
 *   patch:
 *     summary: Update child by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Child ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: Child updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Child not found
 */
router.route("/class/child/:id")
  .all(authorization.isAdmin)
  .get(controller.getChildInfo)
  .delete(controller.deleteChild)
  .patch(controller.updateChild);

/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get teacher information by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Teacher not found
 *   delete:
 *     summary: Delete teacher by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Teacher not found
 *   patch:
 *     summary: Update teacher by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Teacher not found
 */
router.route("/class/teacher/:id")
  .all(authorization.isAdmin)
  .get(controller.getSupervisorInfo)
  .delete(controller.deleteTeacher)
  .patch(controller.updateTeacher);

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Teacher'
 *       401:
 *         description: Unauthorized
 */
router.get("/teachers", authorization.isAdmin, controller.getAllTeachers);

/**
 * @swagger
 * /children:
 *   get:
 *     summary: Get all children
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of children
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Child'
 *       401:
 *         description: Unauthorized
 */
router.get("/children", authorization.isAdmin, controller.getAllChildren);


/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Insert a new teacher
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - fullName
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: New teacher inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: Bad request, missing required fields
 *       401:
 *         description: Unauthorized
 */
router.post("/teachers", authorization.isAdmin, upload.single('img'), controller.insertTeacher);

/**
 * @swagger
 * /children:
 *   post:
 *     summary: Insert a new child
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - fullName
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: New child inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       400:
 *         description: Bad request, missing required fields
 *       401:
 *         description: Unauthorized
 */
router.post("/children", authorization.isAdmin, upload.single('img'), controller.insertChild);

module.exports = router;
