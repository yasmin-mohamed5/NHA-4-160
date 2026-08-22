/**
 * @swagger
 * tags:
 *   name: Admin Plans
 *   description: Admin plan management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Plan:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - duration_months
 *         - courses_limit
 *         - features
 *       properties:
 *         _id:
 *           type: string
 *           example: "66c8a8f5e4b7a123456789ab"
 *         name:
 *           type: string
 *           example: "Premium Plan"
 *         price:
 *           type: number
 *           example: 299.99
 *         duration_months:
 *           type: number
 *           example: 3
 *         courses_limit:
 *           type: number
 *           example: 10
 *         features:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Access to premium courses"
 *             - "Priority support"
 *             - "Certificate"
 */

/**
 * @swagger
 * /api/admin/plans/create:
 *   post:
 *     summary: Create a new plan
 *     tags: [Admin Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - duration_months
 *               - courses_limit
 *               - features
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Premium Plan"
 *               price:
 *                 type: number
 *                 example: 299.99
 *               duration_months:
 *                 type: number
 *                 example: 3
 *               courses_limit:
 *                 type: number
 *                 example: 10
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "Access to premium courses"
 *                   - "Priority support"
 *                   - "Certificate"
 *     responses:
 *       201:
 *         description: Plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/plans/getAll:
 *   get:
 *     summary: Get all plans
 *     tags: [Admin Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Plans retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plan'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/plans/getAllPaginated:
 *   get:
 *     summary: Get paginated plans
 *     description: Returns a paginated list of plans sorted by their MongoDB ID in ascending order.
 *     tags: [Admin Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The page number to retrieve.
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: The number of plans to return per page.
 *         example: 10
 *     responses:
 *       200:
 *         description: Paginated plans retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 plans:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Plan'
 *                 total:
 *                   type: integer
 *                   description: Total number of plans in the database.
 *                   example: 47
 *                 page:
 *                   type: integer
 *                   description: Current page number.
 *                   example: 2
 *                 limit:
 *                   type: integer
 *                   description: Number of plans per page.
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of available pages.
 *                   example: 5
 *       400:
 *         description: Invalid pagination parameters
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/plans/update/{id}:
 *   patch:
 *     summary: Update a plan
 *     tags: [Admin Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the plan to update
 *         example: "66c8a8f5e4b7a123456789ab"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Premium Plan"
 *               price:
 *                 type: number
 *                 example: 349.99
 *               duration_months:
 *                 type: number
 *                 example: 6
 *               courses_limit:
 *                 type: number
 *                 example: 20
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "Access to all courses"
 *                   - "Priority support"
 *                   - "Certificate"
 *     responses:
 *       200:
 *         description: Plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       400:
 *         description: Invalid plan ID or input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/plans/delete/{id}:
 *   delete:
 *     summary: Delete a plan
 *     tags: [Admin Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the plan to delete
 *         example: "66c8a8f5e4b7a123456789ab"
 *     responses:
 *       200:
 *         description: Plan deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Internal server error
 */


import express from "express";
import planController from "../../controllers/admin/planController";
import { verifyToken } from "../../middelware/verifyTocken";

const router = express.Router();

// Create a new plan
router.post("/create", verifyToken, planController.createPlan);

// get all plans
router.get("/getAll", planController.getAllPlans);

// update plan
router.patch("/update/:id", verifyToken, planController.updatePlan);

// deleteplane
router.delete("/delete/:id", verifyToken, planController.deletePlan);

// get paginated data
router.get("/getAllPaginated", verifyToken, planController.getPaginatedPlans);

export default router;