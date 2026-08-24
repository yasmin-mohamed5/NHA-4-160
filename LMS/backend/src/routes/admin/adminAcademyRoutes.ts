import express from "express";
import adminAcademyController from "../../controllers/admin/adminAcademyController";
import { verifyToken } from "../../middelware/verifyTocken";

const router = express.Router();

// get paginated data
router.get("/getAllPaginated", verifyToken, adminAcademyController.getPaginatedAcademies);

// deleteplane
router.delete("/delete/:id", verifyToken, adminAcademyController.deleteAcademy);

export default router;