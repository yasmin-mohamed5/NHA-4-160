import { Enrollment, IEnrollment } from "../../models/student/enrollment";
import mongoose from "mongoose";
import { User, IUser } from "../../models/user/userModel";

class EnrollmentRepository {

  async create(data: any): Promise<IEnrollment> {
    const record = await Enrollment.create({
        studentId: data.studentId,
        tenant_id: data.tenant_id
    });

    return record;
  }

  async getAllStudentsInAcademy(data: any): Promise<IUser[]> {
        const enrollments = await Enrollment.find({
            tenant_id: data.tenant_id
        }).populate("studentId");

        return enrollments.map(
            enrollment => enrollment.studentId as unknown as IUser
        );
    }

  async getStudentNumberInAcademy (data: any): Promise<Number>{
    const numOfUsers = await Enrollment.countDocuments({
      tenant_id: data.tenant_id
    }) || 0;
    return numOfUsers;
  }

}

export default new EnrollmentRepository();