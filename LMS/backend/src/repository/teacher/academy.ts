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

    async getAcademyDetails (_id: any): Promise<IAcademy>{
        const academy = await Academy.findById(_id);
        if (!academy) {
            throw new Error("Academy not found");
        }
        return academy;
    }

}

export default new academyRepository();