/**
 * @swagger
 * tags:
 *   name: Admin Academies
 *   description: Academy management endpoints for super administrators
 */

/**
 * @swagger
 * /api/admin/adminAcademyRoutes/getAllPaginated:
 *   get:
 *     summary: Get paginated academies
 *     description: Returns a paginated list of academies. Only authenticated SUPERADMIN users can access this endpoint.
 *     tags:
 *       - Admin Academies
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: Page number
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         required: true
 *         description: Number of academies per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *
 *     responses:
 *       200:
 *         description: Academies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 academies:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Academy'
 *                 total:
 *                   type: integer
 *                   example: 25
 *
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *
 *       403:
 *         description: Forbidden - SUPERADMIN role required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access denied
 *
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/adminAcademyRoutes/delete/{id}:
 *   delete:
 *     summary: Delete an academy
 *     description: Deletes an academy by its MongoDB ObjectId. Only authenticated SUPERADMIN users can access this endpoint.
 *     tags:
 *       - Admin Academies
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the academy
 *         schema:
 *           type: string
 *           example: 64f123456789abcdef123456
 *
 *     responses:
 *       200:
 *         description: Academy deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Academy deleted successfully
 *
 *       400:
 *         description: Invalid academy ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid academy ID
 *
 *       401:
 *         description: Not authenticated
 *
 *       403:
 *         description: Forbidden - SUPERADMIN role required
 *
 *       404:
 *         description: Academy not found
 *
 *       500:
 *         description: Internal server error
 */

import express from "express";
import adminAcademyController from "../../controllers/admin/adminAcademyController";
import { verifyToken } from "../../middelware/verifyTocken";
import {Role} from "../../models/user/userModel";
import {authorizeRole} from "../../middelware/autherizeRole"

const router = express.Router();

// get paginated academies
router.get(
    "/getAllPaginated", 
    verifyToken, 
    authorizeRole(Role.SUPERADMIN), 
    adminAcademyController.getPaginatedAcademies
);

// delete academy
router.delete(
    "/delete/:id", 
    verifyToken, 
    authorizeRole(Role.SUPERADMIN), 
    adminAcademyController.deleteAcademy
);

export default router;