/**
 * @swagger
 * tags:
 *   - name: Teacher Academy
 *     description: Teacher academy management APIs
 *
 * components:
 *   schemas:
 *
 *     Academy:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f123456789abcdef123456
 *         name:
 *           type: string
 *           example: TechBase Academy
 *         planId:
 *           type: string
 *           example: 64f123456789abcdef123457
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2026-08-23T10:53:05.753Z
 *
 *     Student:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f123456789abcdef123456
 *         name:
 *           type: string
 *           example: Mohamed Ahmed
 *         email:
 *           type: string
 *           format: email
 *           example: student@example.com
 *         phone:
 *           type: string
 *           example: "01012345678"
 *         role:
 *           type: string
 *           example: student
 *         tenant_id:
 *           type: string
 *           example: 64f123456789abcdef123457
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2026-08-23T10:53:05.753Z
 *
 * /api/teacher/academyDetails/{tenantId}:
 *   get:
 *     tags:
 *       - Teacher Academy
 *     summary: Get academy details
 *     description: Returns the details of an academy using its tenant ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the academy
 *         example: 64f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Academy found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: academy founded
 *                 academyDetail:
 *                   $ref: '#/components/schemas/Academy'
 *       400:
 *         description: Academy ID is required
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       404:
 *         description: Academy not found
 *       500:
 *         description: Internal server error
 *
 * /api/teacher/enrolledStydents/{tenantId}:
 *   get:
 *     tags:
 *       - Teacher Academy
 *     summary: Get all students in an academy
 *     description: Returns all students enrolled in the specified academy.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the academy
 *         example: 64f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Students found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: students founded
 *                 students:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       400:
 *         description: Academy ID is required
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Server error
 *
 * /api/teacher/statuse/{tenantId}:
 *   get:
 *     tags:
 *       - Teacher Academy
 *     summary: Get academy statistics
 *     description: Returns the total number of students and courses in an academy.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the academy
 *         example: 64f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Academy statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: students founded
 *                 numOfStudentsInAcademy:
 *                   type: integer
 *                   example: 25
 *                 numOfCoursesInAcademy:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Academy ID is required
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Server error
 */

import express from "express";
import { verifyToken } from "../../middelware/verifyTocken";
import academyDetals from "../../controllers/teacher/academyDetails"

const router = express.Router();

router.get("/academyDetails/:tenantId", verifyToken, academyDetals.getAcademyDetails);
router.get("/enrolledStydents/:tenantId", verifyToken, academyDetals.getAllstudentsInAcademy);
router.get("/statuse/:tenantId", verifyToken, academyDetals.getTenantStats);

export default router;