 /**
  * @swagger
  * tags:
  *   name: Admin Users
  *   description: User management for super administrators
  */

 /**
  * @swagger
  * /api/admin/user/getAllPaginated:
  *   get:
  *     summary: Get paginated users
  *     description: Returns a paginated list of users. Only authenticated SUPERADMIN users can access this endpoint.
  *     tags:
  *       - Admin Users
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: query
  *         name: page
  *         required: true
  *         description: Page number
  *         schema:
  *           type: integer
  *           minimum: 1
  *           example: 1
  *       - in: query
  *         name: limit
  *         required: true
  *         description: Number of users per page
  *         schema:
  *           type: integer
  *           minimum: 1
  *           example: 10
  *     responses:
  *       200:
  *         description: Users retrieved successfully
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 users:
  *                   type: array
  *                   items:
  *                     $ref: '#/components/schemas/User'
  *                 total:
  *                   type: integer
  *                   example: 50
  *       401:
  *         description: Not authenticated
  *       403:
  *         description: Forbidden - SUPERADMIN role required
  *       500:
  *         description: Internal server error
  */

 /**
  * @swagger
  * /api/admin/user/delete/{id}:
  *   delete:
  *     summary: Delete a user
  *     description: Deletes a user by MongoDB ObjectId. Only authenticated SUPERADMIN users can access this endpoint.
  *     tags:
  *       - Admin Users
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: MongoDB ObjectId of the user
  *         schema:
  *           type: string
  *           example: 64f123456789abcdef123456
  *     responses:
  *       200:
  *         description: User deleted successfully
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                   example: User deleted successfully
  *       400:
  *         description: Invalid user ID
  *       401:
  *         description: Not authenticated
  *       403:
  *         description: Forbidden - SUPERADMIN role required
  *       404:
  *         description: User not found
  *       500:
  *         description: Internal server error
  */

import express from "express";
import adminUserController from "../../controllers/admin/usersController";
import { verifyToken } from "../../middelware/verifyTocken";
import {Role} from "../../models/user/userModel";
import {authorizeRole} from "../../middelware/autherizeRole"

const router = express.Router();

// get paginated data
router.get(
    "/getAllPaginated", 
    verifyToken, 
    authorizeRole(Role.SUPERADMIN), 
    adminUserController.getPaginatedUsers
);

// deleteplane
router.delete(
    "/delete/:id", 
    verifyToken, 
    authorizeRole(Role.SUPERADMIN), 
    adminUserController.deleteUser
);

export default router;