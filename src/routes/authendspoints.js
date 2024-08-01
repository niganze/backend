import { login, signup, verifyOTPAndUpdatePassword, generateAndSendOTP, changepassword, getAllUsers, deleteUserById, updateUserById, findUserById } from "../authentication/index.js";
import express from "express";
import { verifyingtoken } from "../utils/jwtfunctions.js";
import checkActive from "../middleware/checkActive.js";

const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", checkActive, login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Names
 *               - email
 *               - password
 *             properties:
 *               Names:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               Username:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               location:
 *                 type: string
 *               role:
 *                 type: string
 *                 default: "user"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       409:
 *         description: Email is already in use
 */
authRouter.post("/signup", signup);

/**
 * @swagger
 * /api/auth/forget:
 *   post:
 *     summary: Generate and send OTP for password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       404:
 *         description: User not found
 */
authRouter.post("/forget", generateAndSendOTP);

/**
 * @swagger
 * /api/auth/reset:
 *   post:
 *     summary: Verify OTP and update password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *               - newPassword
 *             properties:
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid OTP or parameters
 */
authRouter.post("/reset", verifyOTPAndUpdatePassword);

authRouter.use(verifyingtoken);

/**
 * @swagger
 * /api/auth/getAllUsers:
 *   get:
 *     summary: Get all users
 *     tags: [User Management]
 *     responses:
 *       200:
 *         description: List of all users
 */
authRouter.get("/getAllUsers", getAllUsers);

/**
 * @swagger
 * /api/auth/change:
 *   post:
 *     summary: Change user password
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Current password is incorrect
 */
authRouter.post("/change", changepassword);

/**
 * @swagger
 * /api/auth/getUserById/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
authRouter.get("/getUserById/:id", findUserById);

/**
 * @swagger
 * /api/auth/deleteUserById/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
authRouter.delete("/deleteUserById/:id", deleteUserById);

/**
 * @swagger
 * /api/auth/updateUserById/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Names:
 *                 type: string
 *               email:
 *                 type: string
 *               Username:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               location:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
authRouter.patch("/updateUserById/:id", updateUserById);

export default authRouter;
