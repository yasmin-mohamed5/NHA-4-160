import { Request, Response } from "express";
import adminUserService from "../../services/admin/adminUsersService";

class UserController {
    async getPaginatedUsers(req: Request, res: Response) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await adminUserService.getPaginatedUsers(
        page,
        limit
        );

        return res.status(200).json({
        data: result.users,
        count: result.total
        });

    } catch (error: any) {
        res.status(500).json({
        message: error.message
        });
    }
    }

    async deleteUser (req: Request, res: Response){
        try {
        const { id } = req.params as { id: string };
            await adminUserService.deleteUser(id);
            res.status(204).send();
        } catch (error:any) {
        res.status(error.code || 500).json({ message: error.message });
        }
    }
}

export default new UserController();