import { Enrollment, IEnrollment } from "../../models/student/enrollment";
import mongoose from "mongoose";

class EnrollmentRepository {

  async create(data: any): Promise<IEnrollment> {
    const record = await Enrollment.create({
      studentId: data.studentId,
        tenant_id: data.tenant_id
    });

    return record;
  }
  
}

export default new EnrollmentRepository();