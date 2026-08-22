import { Plan, IPlan } from "../../models/admin/plan";
import mongoose from "mongoose";

class PlanRepository {

    // Create a new plan
    async createPlan(data: any): Promise<IPlan> {
        const plan = await Plan.create({
            name: data.name,
            price: data.price,
            duration_months: data.duration_months,
            courses_limit: data.courses_limit,
            features: data.features,
        });
        return plan;
    }

    // Get paginated plans
    async getPaginatedPlans(page: number, limit: number) {
        
        const skip = (page - 1) * limit;

        const [plans, total] = await Promise.all([
            Plan.find()
                .sort({ _id: 1 })
                .skip(skip)
                .limit(limit),

            Plan.countDocuments()
        ]);

        return {
            plans,
            total
        };
    }
    
    // get all plans
    async getAllPlans(){
        return Plan.find();
    }

    // Update an existing plan
    async updatePlan(id: string, data: any): Promise<IPlan | null> {
        return Plan.findByIdAndUpdate(
            id,
            data,
            {
                new: true,  
                runValidators: true
            }
        );  
    }

    // Delete a plan
    async deletePlan(id: string): Promise<IPlan | null> {
        const plan = await Plan.findByIdAndDelete(id);
        return plan;
    }
}

export default new PlanRepository();