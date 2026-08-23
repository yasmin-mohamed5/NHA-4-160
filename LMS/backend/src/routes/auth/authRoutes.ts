/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and account management
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     RegisterTeacher:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Ahmed Ali
 *         email:
 *           type: string
 *           format: email
 *           example: teacher@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: Teacher@123
 *         phone:
 *           type: string
 *           example: "01012345678"
 *         academyName:
 *           type: string
 *           example: TechBase Academy
 *         planId:
 *           type: string
 *           example: 64f123456789abcdef123456
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phone
 *         - academyName
 *         - planId
 *
 *     RegisterStudent:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Mohamed Ahmed
 *         email:
 *           type: string
 *           format: email
 *           example: student@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: Student@123
 *         phone:
 *           type: string
 *           example: "01012345678"
 *         tenant_id:
 *           type: string
 *           example: 64f123456789abcdef123456
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phone
 *         - tenant_id
 *
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: Password@123
 *       required:
 *         - email
 *         - password
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 64f123456789abcdef123456
 *         name:
 *           type: string
 *           example: Ahmed Ali
 *         email:
 *           type: string
 *           format: email
 *           example: ahmed@example.com
 *
 * /api/auth/register/teacher:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a teacher
 *     description: Creates a new teacher account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterTeacher'
 *     responses:
 *       201:
 *         description: Teacher registered successfully
 *       400:
 *         description: Invalid request
 *       409:
 *         description: Email is already registered
 *       500:
 *         description: Internal server error
 *
 * /api/auth/register/student:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a student
 *     description: Creates a new student account and enrollment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterStudent'
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       400:
 *         description: Invalid request
 *       409:
 *         description: Email is already registered
 *       500:
 *         description: Internal server error
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticates a user using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 *
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout user
 *     description: Logs out the currently authenticated user.
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       500:
 *         description: Internal server error
 *
 * /api/auth/profile:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current user profile
 *     description: Returns the profile of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are authorized
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */

import express from "express";
import {registerTeacher} from "../../controllers/teacher/authController";
import {registerStudent} from "../../controllers/student/registerStudentController"
import { login, logout } from "../../controllers/user/loginLogout";
import { verifyToken } from "../../middelware/verifyTocken";

const router = express.Router();

// ===== REGISTER =====
router.post("/register/teacher", registerTeacher);
router.post("/register/student", registerStudent);

// ===== LOGIN =====
router.post("/login", login);

// ===== LOGOUT =====
router.post("/logout", logout);

// ===== PROFILE =====
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "You are authorized",
    user: (req as any).user,
  });
});

export default router;
