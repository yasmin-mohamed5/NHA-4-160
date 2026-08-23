import { Course, ICourse } from "../../models/teacher/courses";
import mongoose from "mongoose";

class CourseRepository {
  
    async findById(id: string): Promise<ICourse | null> {
      return Course.findById(id);
    }

    // for super admin
  async getNumberOfcoures (): Promise<Number>{
    const numOfUsers = await Course.countDocuments() || 0;
    return numOfUsers;
  }

//   for teacher
  async getNumberOfcouresInAcademy (id: any): Promise<Number>{
    const numOfUsers = await Course.countDocuments({tanent_id : id}) || 0;
    return numOfUsers;
  }

}

export default new CourseRepository();