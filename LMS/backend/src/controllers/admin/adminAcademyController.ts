import { Request, Response } from "express";
import adminAcademtService from "../../services/admin/academyService";

class AcademyController {

    async getPaginatedAcademies(req: Request, res: Response) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await adminAcademtService.getPaginatedAcademies(
        page,
        limit
        );

        return res.status(200).json({
        data: result.academies,
        count: result.total
        });

    } catch (error: any) {
        res.status(500).json({
        message: error.message
        });
    }
    }

    async deleteAcademy (req: Request, res: Response){
        try {
        const { id } = req.params as { id: string };
            await adminAcademtService.deleteAcademy(id);
            res.status(204).json({ message: "Academy deleted successfully" });
        } catch (error:any) {
        res.status(error.code || 500).json({ message: error.message });
        }
    }
}

export default new AcademyController();