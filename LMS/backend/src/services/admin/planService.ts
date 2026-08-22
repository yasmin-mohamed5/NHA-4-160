import planRepository from "../../repository/admin/planRepository";

class PlanService {
    // Create a new plan
    async createPlan(
        name: string, 
        price: number, 
        duration_months: number, 
        courses_limit: number,
        features: string[]
    ): Promise<any> {
        // check if all fields are provided 
        if (!name.trim() || !price || !duration_months || !courses_limit || !features) {
            const error = { 
                message: "All fields are required",
                code: 400
            };
            throw error;
        }
        // check if the values are valid
        if( price <= 0 || duration_months <= 0 || courses_limit <= 0) {
            const error = { 
                message: "Price, duration, and courses limit must be greater than zero",
                code: 400
            };
            throw error;
        }
        if( features.length === 0) {
            const error = { 
                message: "Features must be a non-empty array",
                code: 400
            };
            throw error;
        }
        if(!/^[a-zA-Z0-9\s]/.test(name)) {
            const error = { 
                message: "Invalid plan name",
                code: 400
            };
            throw error;
        }

        const data = { name, price, duration_months, courses_limit, features };
        return planRepository.createPlan(data);
    }  

    async getPaginatedPlans(page: number, limit: number) {
        return await planRepository.getPaginatedPlans(page, limit);
    }

    // get all plans
    async getAllPlans(){
        return planRepository.getAllPlans() || [];
    }

    // Update an existing plan
    async updatePlan(id: string, data: any): Promise<any> {
        // check if there is an empty field in the data object
        if (!data.name && !data.price && !data.duration_months) {
            const error = { 
                message: "At least one field (name, price, duration_months) must be provided for update",
                code: 400
            };
            throw error;
        }
        // check if the plan exists
        const plan = await planRepository.updatePlan(id, data);
        if (!plan) {
            const error = { 
                message: "Plan not found",
                code: 404
            };
            throw error;
        }
        return plan;
    }

    // Delete a plan
    async deletePlan(id: string): Promise<any> {
        // check if the plan exists
        const plan = await planRepository.deletePlan(id);
        if (!plan) {
            const error = { 
                message: "Plan not found",
                code: 404
            };
            throw error;
        }
    }
}

export default new PlanService();