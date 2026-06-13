import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/job/post:
 *   post:
 *     summary: Post a new job
 *     description: Allows an authenticated recruiter/admin to create a new job posting.
 *     tags:
 *       - Job
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - requirements
 *               - salary
 *               - location
 *               - jobType
 *               - experience
 *               - position
 *               - companyId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Frontend Developer
 *               description:
 *                 type: string
 *                 example: Responsible for building responsive React user interfaces.
 *               requirements:
 *                 type: string
 *                 example: React,JavaScript,Tailwind CSS
 *               salary:
 *                 type: number
 *                 example: 6
 *               location:
 *                 type: string
 *                 example: Kolkata
 *               jobType:
 *                 type: string
 *                 example: Full Time
 *               experience:
 *                 type: string
 *                 example: 1
 *               position:
 *                 type: number
 *                 example: 2
 *               companyId:
 *                 type: string
 *                 example: 66b123456789abcdef123456
 *     responses:
 *       201:
 *         description: New job created successfully
 *       400:
 *         description: Missing required fields
 */
router.route("/post").post(isAuthenticated,postJob);
/**
 * @swagger
 * /api/v1/job/get:
 *   get:
 *     summary: Get all jobs
 *     description: Fetches all jobs. Supports optional keyword search by title or description.
 *     tags:
 *       - Job
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: Search keyword for job title or description
 *         example: React
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 *       404:
 *         description: Jobs not found
 */
router.route("/get").get(getAllJobs);
/**
 * @swagger
 * /api/v1/job/getAdminJobs:
 *   get:
 *     summary: Get recruiter/admin jobs
 *     description: Fetches jobs created by the authenticated recruiter/admin.
 *     tags:
 *       - Job
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Admin jobs fetched successfully
 *       404:
 *         description: Jobs not found
 */
router.route("/getAdminJobs").get(isAuthenticated,getAdminJobs);
/**
 * @swagger
 * /api/v1/job/get/{id}:
 *   get:
 *     summary: Get job by ID
 *     description: Fetches a single job by ID and includes its applications.
 *     tags:
 *       - Job
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB job ID
 *         example: 66b123456789abcdef123456
 *     responses:
 *       200:
 *         description: Job fetched successfully
 *       404:
 *         description: Job not found
 */
router.route("/get/:id").get(getJobById);



export default router;