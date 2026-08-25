import enroll from "../../repository/student/enrollmentRepository"
import { Request, Response } from "express";
import {Role} from "../../models/user/userModel";
import academyRepository from "../../repository/teacher/academy"
import courseRepository from "../../repository/teacher/coursesRepository"

class academyDetails{
    async getAcademyDetails (req: Request, res: Response){
        const { tenantId } = req.params;
        if(!tenantId){
            return res.status(400).json({ message: "academy id is required" });
        }
        try {
            const academyDetail = await academyRepository.getAcademyDetails(tenantId);
            return res.status(200).json({
                message: "academy founded",
                academyDetail
            });

        } catch (error) {
            return res.status(404).json({ message: "academy not found" });
        }
    }

    // array of users
    async getAllstudentsInAcademy(req: Request, res: Response){
        const { tenantId } = req.params;
        if(!tenantId){
            return res.status(400).json({ message: "academy id is required" });
        }
        try {
            const students = await enroll.getAllStudentsInAcademy(tenantId);
            return res.status(200).json({
                message: "students founded",
                students
            });
        } catch (error) {
            return res.status(500).json({ message: "server error!" });
        }
    }

    // getTenantStats
    async getTenantStats(req: Request, res: Response){
        const { tenantId } = req.params;
        if(!tenantId){
            return res.status(400).json({ message: "academy id is required" });
        }
        try {
            const tenant_id = tenantId;
            const numOfStudentsInAcademy = await enroll.getStudentsNumberInAcademy(tenant_id);
            const numOfCoursesInAcademy = await courseRepository.getNumberOfcouresInAcademy(tenant_id);
            return res.status(200).json({
                message: "students founded",
                numOfStudentsInAcademy,
                numOfCoursesInAcademy
            });
        } catch (error) {
            return res.status(500).json({ message: "server error!" });
        }
    }
}

export default new academyDetails();