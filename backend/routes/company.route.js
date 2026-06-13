import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { allCompanies, getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router= express.Router();

/**
 * @swagger
 * /api/v1/company/register:
 *   post:
 *     summary: Register a company
 *     description: Creates a new company for the authenticated recruiter.
 *     tags:
 *       - Company
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: Google
 *     responses:
 *       201:
 *         description: Company registered successfully
 *       400:
 *         description: Company already exists or invalid input
 */
router.route("/register").post(isAuthenticated,registerCompany);
/**
 * @swagger
 * /api/v1/company/get:
 *   get:
 *     summary: Get recruiter companies
 *     description: Fetches all companies created by the authenticated recruiter.
 *     tags:
 *       - Company
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Companies fetched successfully
 *       404:
 *         description: Companies not found
 */
router.route("/get").get(isAuthenticated,getCompany);
/**
 * @swagger
 * /api/v1/company/get/{id}:
 *   get:
 *     summary: Get company by ID
 *     description: Fetches a company using its MongoDB ID.
 *     tags:
 *       - Company
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66b123456789abcdef123456
 *     responses:
 *       200:
 *         description: Company fetched successfully
 *       404:
 *         description: Company not found
 */
router.route("/get/:id").get(isAuthenticated,getCompanyById);
/**
 * @swagger
 * /api/v1/company/update/{id}:
 *   put:
 *     summary: Update company details
 *     description: Updates company information and uploads company logo.
 *     tags:
 *       - Company
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66b123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               name:
 *                 type: string
 *                 example: Google
 *               description:
 *                 type: string
 *                 example: Global technology company
 *               website:
 *                 type: string
 *                 example: https://google.com
 *               location:
 *                 type: string
 *                 example: California, USA
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Company logo
 *     responses:
 *       200:
 *         description: Company information updated successfully
 *       404:
 *         description: Company not found
 */
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);
/**
 * @swagger
 * /api/v1/company/all-companies:
 *   get:
 *     summary: Get all companies
 *     description: Fetches all companies with public information.
 *     tags:
 *       - Company
 *     responses:
 *       200:
 *         description: Companies fetched successfully
 *       404:
 *         description: Companies not found
 *       500:
 *         description: Internal server error
 */
router.route("/all-companies").get(allCompanies);

export default router; 
