import { Academy, IAcademy } from "../../models/teacher/academy";
import mongoose from "mongoose";

class academyRepository{

    async create(data: any): Promise<IAcademy>{
        const academy = await Academy.create({
        name: data.name,
        planId: data.planId,
        created_at: data.created_at
    });

    return academy;
    }

    async deleteacademy(id: string): Promise<IAcademy | null> {
      return Academy.findByIdAndDelete(id);
    }

    async getPaginatedAcademies(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const [academies, total] = await Promise.all([
            Academy.aggregate([
            {
                $sort: { _id: 1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },

            // Get the admin user
            {
                $lookup: {
                from: "users",
                let: { tenantId: "$_id" },
                pipeline: [
                    {
                    $match: {
                        $expr: {
                        $and: [
                            { $eq: ["$tenant_id", "$$tenantId"] },
                            { $eq: ["$role", "admin"] }
                        ]
                        }
                    }
                    },
                    {
                    $project: {
                        _id: 1,
                        name: 1,
                        email: 1
                    }
                    }
                ],
                as: "admin"
                }
            },

            // Get the plan
            {
                $lookup: {
                from: "plans",
                localField: "planId",
                foreignField: "_id",
                as: "plan"
                }
            },

            // Convert arrays to objects
            {
                $unwind: {
                path: "$admin",
                preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                path: "$plan",
                preserveNullAndEmptyArrays: true
                }
            },

            // Return only what you need
            {
                $project: {
                _id: 1,
                name: 1,
                admin: 1,
                plan: 1
                }
            }
            ]),

            Academy.countDocuments()
        ]);

        return {
            academies,
            total
        };
        }

    async getAcademyDetails (_id: any): Promise<IAcademy>{
        const academy = await Academy.findById(_id);
        if (!academy) {
            throw new Error("Academy not found");
        }
        return academy;
    }

}

export default new academyRepository();