import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";
 
const router = express.Router();

/**
 * @swagger
 * /api/v1/application/apply/{id}:
 *   get:
 *     summary: Apply for a job
 *     description: Allows an authenticated student to apply for a specific job.
 *     tags:
 *       - Application
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *         example: 66b123456789abcdef123456
 *     responses:
 *       201:
 *         description: Job applied successfully
 *       400:
 *         description: Job ID missing or user already applied
 *       404:
 *         description: Job not found
 */
router.route("/apply/:id").get(isAuthenticated, applyJob);
/**
 * @swagger
 * /api/v1/application/get:
 *   get:
 *     summary: Get applied jobs
 *     description: Fetches all jobs applied by the authenticated student.
 *     tags:
 *       - Application
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Applied jobs fetched successfully
 *       404:
 *         description: No applications found
 */
router.route("/get").get(isAuthenticated, getAppliedJobs);
/**
 * @swagger
 * /api/v1/application/{id}/applicants:
 *   get:
 *     summary: Get job applicants
 *     description: Fetches all applicants for a specific job.
 *     tags:
 *       - Application
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *         example: 66b123456789abcdef123456
 *     responses:
 *       200:
 *         description: Applicants fetched successfully
 *       404:
 *         description: Job not found
 */
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
/**
 * @swagger
 * /api/v1/application/status/{id}/update:
 *   post:
 *     summary: Update application status
 *     description: Allows recruiter/admin to update an application status.
 *     tags:
 *       - Application
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *         example: 66b123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: accepted
 *                 enum:
 *                   - pending
 *                   - accepted
 *                   - rejected
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Status is required
 *       404:
 *         description: Application not found
 */
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;
