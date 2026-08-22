import { Request, Response } from "express";
import planService from "../../services/admin/planService";

class PlanController {
  // Create a new plan
    async createPlan(req: Request, res: Response) {
        try {
            const { name, price, duration_months, courses_limit, features } = req.body;

            const plan = await planService.createPlan(name, price, duration_months, courses_limit, features);

            res.status(201).json(plan);
        } catch (error:any) {
            res.status(error.code || 500).json({ message: error.message });

        }
    }

    async getPaginatedPlans(req: Request, res: Response) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const plans = await planService.getPaginatedPlans(
        page,
        limit
        );

        res.status(200).json(plans);

    } catch (error: any) {
        res.status(500).json({
        message: error.message
        });
    }
    }

    // get all plans
    async getAllPlans(req: Request, res: Response){
        try{
            const plans = await planService.getAllPlans();
            res.status(200).json(plans);
        }catch(error :any){

        }
    }

    // Update an existing plan
    async updatePlan(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { name, price, duration_months } = req.body;
            const plan = await planService.updatePlan(id, { name, price, duration_months });
            res.status(200).json(plan);
        } catch (error:any) {
            res.status(error.code || 500).json({ message: error.message });
        }
    }

  // Delete a plan
    async deletePlan(req: Request, res: Response) {
        try {
        const { id } = req.params as { id: string };
            await planService.deletePlan(id);
            res.status(204).json({ message: "Plan deleted successfully" });
        } catch (error:any) {
        res.status(error.code || 500).json({ message: error.message });
        }
    }
}

export default new PlanController();