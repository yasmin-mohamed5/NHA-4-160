import express from "express";
import adminUserController from "../../controllers/admin/usersController";
import { verifyToken } from "../../middelware/verifyTocken";

const router = express.Router();

// get paginated data
router.get("/getAllPaginated", verifyToken, adminUserController.getPaginatedUsers);

// deleteplane
router.delete("/delete/:id", verifyToken, adminUserController.deleteUser);

export default router;