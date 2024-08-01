import { Router } from 'express';
import { getProjects, addProject, editProject, deleteProject, setProjectStatus, downloadProjectFile } from '../controllers/projectController.js';
import authMiddleware from '../middleware/auth.js';
import { verifyingtoken } from '../utils/jwtfunctions.js';
import { uploaded } from '../middleware/multer.js';

const router = Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Project Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get('/', verifyingtoken, getProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Add a new project
 *     tags: [Project Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *               projectFile:
 *                 type: string
 *                 format: binary
 *               schoolId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', verifyingtoken, uploaded, addProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Edit an existing project
 *     tags: [Project Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *               projectFile:
 *                 type: string
 *                 format: binary
 *               schoolId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 */
router.put('/:id', verifyingtoken, uploaded, editProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Project Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete('/:id', verifyingtoken, deleteProject);

/**
 * @swagger
 * /api/projects/{id}/status:
 *   patch:
 *     summary: Set project status
 *     tags: [Project Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project status updated successfully
 *       404:
 *         description: Project not found
 */
router.patch('/:id/status', verifyingtoken, setProjectStatus);

/**
 * @swagger
 * /api/projects/{id}/download:
 *   get:
 *     summary: Download project file
 *     tags: [Project Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project file downloaded successfully
 *       404:
 *         description: Project not found
 */
router.get('/:id/download', verifyingtoken, downloadProjectFile);

export default router;
