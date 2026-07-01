import express from "express";
import { login, logout, register, updateProfile, getCommunityStats } from "../controller/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { profileUpload, singleUpload } from "../middlewares/multer.js";


const router = express.Router();

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new student or recruiter account with optional profile photo upload.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - phoneNumber
 *               - password
 *               - role
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Rohan Ghosh
 *               email:
 *                 type: string
 *                 example: rohan@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: student
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing fields or user already exists
 */
router.route("/register").post(singleUpload,register);
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user based on email, password, and role.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: rohan@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: student
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials or role mismatch
 */
router.route("/login").post(login);
/**
 * @swagger
 * /api/v1/user/logout:
 *   get:
 *     summary: Logout user
 *     description: Clears the authentication token cookie.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.route("/logout").get(logout);
router.route("/stats").get(getCommunityStats);
/**
 * @swagger
 * /api/v1/user/profile/update:
 *   post:
 *     summary: Update user profile
 *     description: Updates authenticated user's profile details and uploads resume file.
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Rohan Ghosh
 *               email:
 *                 type: string
 *                 example: rohan@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               bio:
 *                 type: string
 *                 example: MERN stack developer and backend enthusiast.
 *               skills:
 *                 type: string
 *                 example: React,Node.js,Express,MongoDB
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Resume file is required
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: User not found or invalid request
 */
router.route("/profile/update").post(isAuthenticated,profileUpload,updateProfile);

export default router;