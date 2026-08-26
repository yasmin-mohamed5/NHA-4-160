import { CourseEnrollment, ICourseEnrollment } from "../../models/student/CourseEnrollment";

class EnrollmentRepository {

  async create(data: any): Promise<ICourseEnrollment> {
    const record = await CourseEnrollment.create({
        studentId: data.studentId,
        course_id: data.tenant_id
    });

    return record;
  }

  async deleteMany (userId: any){
    return CourseEnrollment.deleteMany({
      studentId: userId
    });
  }

}

export default new EnrollmentRepository();