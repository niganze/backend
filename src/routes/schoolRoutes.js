// routes/schoolRoutes.js
import { Router } from 'express';
import { addSchool, editSchool, deleteSchool, revokeGrantSchool, getSchools, getSchoolById } from '../controllers/schoolController.js';
import auth from '../middleware/auth.js';

const router = Router();

/**
 * @swagger
 * /api/schools:
 *   post:
 *     summary: Add a new school
 *     tags: [School Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - school_name
 *               - district
 *               - sector
 *               - phone
 *               - email
 *               - username
 *               - password
 *             properties:
 *               school_name:
 *                 type: string
 *               district:
 *                 type: string
 *               sector:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: School added successfully
 *       '400':
 *         description: Invalid input
 */
router.post('/', auth, addSchool);

/**
 * @swagger
 * /api/schools/{id}:
 *   put:
 *     summary: Edit a school
 *     tags: [School Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: School ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               school_name:
 *                 type: string
 *               district:
 *                 type: string
 *               sector:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: School updated successfully
 *       '404':
 *         description: School not found
 */
router.put('/:id', auth, editSchool);

/**
 * @swagger
 * /api/schools/{id}:
 *   delete:
 *     summary: Delete a school
 *     tags: [School Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: School ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: School deleted successfully
 *       '404':
 *         description: School not found
 */
router.delete('/:id', auth, deleteSchool);

/**
 * @swagger
 * /api/schools/{id}/revoke-grant:
 *   patch:
 *     summary: Revoke or grant school status
 *     tags: [School Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: School ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: School status updated successfully
 *       '404':
 *         description: School not found
 */
router.patch('/:id/revoke-grant', auth, revokeGrantSchool);

/**
 * @swagger
 * /api/schools:
 *   get:
 *     summary: Get all schools
 *     tags: [School Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   school_name:
 *                     type: string
 *                   district:
 *                     type: string
 *                   sector:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   username:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get('/', auth, getSchools);

/**
 * @swagger
 * /api/schools/{id}:
 *   get:
 *     summary: Get a school by ID
 *     tags: [School Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: School ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: School data
 *       '404':
 *         description: School not found
 */
router.get('/:id', auth, getSchoolById);

export default router;
